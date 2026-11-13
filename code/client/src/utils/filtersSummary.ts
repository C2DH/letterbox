import { DateFilter, FiltersState, KeywordsFilter } from '@ouestware/facets';

import {
  APP_LANGUAGE,
  DATE_FACET,
  ITEM_TYPE_LABELS,
  ITEM_TYPE_LABELS_PLURAL,
  ItemType,
  TAGS_FACET,
  VERIFIED_FACET,
} from '../core/consts';
import { getDateFilter } from './filters';

type FilterableItemType = Exclude<ItemType, 'message'>;

/**
 * VOCABULARY
 * **********
 */

/**
 * How an explored item type relates to the items of another type it is filtered on.
 * - `verb` starts the clause ("companies located at X")
 * - `repeat` replaces `verb` when the previous clause uses the same verb
 *   ("linked to X, to Y" instead of "linked to X, linked to Y")
 */
type Relation = { verb: string; repeat: string };

const LINKED_TO: Relation = { verb: 'linked to', repeat: 'to' };
const LOCATED_AT: Relation = { verb: 'located at', repeat: 'at' };
const IN: Relation = { verb: 'in', repeat: 'in' };

const RELATIONS: Record<ItemType, Record<FilterableItemType, Relation>> = {
  message: { person: LINKED_TO, company: LINKED_TO, address: LINKED_TO, country: LINKED_TO },
  person: { person: LINKED_TO, company: LINKED_TO, address: LOCATED_AT, country: IN },
  company: { person: LINKED_TO, company: LINKED_TO, address: LOCATED_AT, country: IN },
  address: { person: LINKED_TO, company: LINKED_TO, address: LINKED_TO, country: IN },
  country: { person: LINKED_TO, company: LINKED_TO, address: LINKED_TO, country: LINKED_TO },
};

export const ENTITY_FACETS_ORDER: FilterableItemType[] = ['person', 'company', 'address', 'country'];

export const QUERY_FACET_ID = 'query';

const MAX_VISIBLE_VALUES = 3;

const TAGS_VERB = 'tagged';
const QUERY_VERB = 'matching';
export const STATUS_LABELS = { verified: 'verified', unverified: 'unverified' } as const;

function getFacetNoun(facet: string, plural: boolean): string {
  if (facet === TAGS_FACET.id) return plural ? 'tags' : 'tag';
  return (plural ? ITEM_TYPE_LABELS_PLURAL : ITEM_TYPE_LABELS)[facet as ItemType].toLowerCase();
}

/**
 * DATA STRUCTURE
 * **************
 */

type SummaryValue = {
  value: string;
  // `label` is undefined while loading, and null when the value is unknown:
  label: string | null | undefined;
};

export type SummaryToken =
  | { type: 'text'; text: string }
  | { type: 'count'; count?: number }
  | { type: 'itemType'; itemType: ItemType; plural: boolean }
  | { type: 'status'; verified: boolean }
  | { type: 'query'; query: string }
  | { type: 'value'; facet: string; value: string; label: string }
  // Value whose label is still loading:
  | { type: 'loading'; facet: string; value: string }
  // Values whose label could not be found, grouped:
  | { type: 'unknown'; facet: string; values: string[] }
  | { type: 'more'; facet: string; count: number }
  // Input to add a new value, rendered as the last value of the list:
  // When `replaces` is set, the picker replaces that value, at its position:
  | { type: 'picker'; facet: string; replaces?: string }
  | { type: 'year'; bound: 'min' | 'max'; year: number };

type SummaryClause = {
  // Facet ID, or QUERY_FACET_ID for the full-text query
  facet: string;
  tokens: SummaryToken[];
};

export type FiltersSummary = {
  head: SummaryToken[];
  clauses: SummaryClause[];
};

/**
 * HELPERS
 * *******
 */

/**
 * Returns the text to put before the clause at `index`, in a sentence with `total` clauses.
 */
export function getClauseSeparator(index: number, total: number): string {
  if (index === 0) return ' ';
  if (index === total - 1) return total === 2 ? ' and ' : ', and ';
  return ', ';
}

/**
 * Returns "A", "A or B", "A, B or C", or "A, B, C or 2 other people", as tokens. Unknown values
 * are grouped at the end ("A or 2 unknown people"). When `picking` is true, a picker token is
 * added as the last value ("A, B or [picker]"). When `editing` is set, a picker token replaces
 * that value ("A, [picker] or C").
 */
function getValuesTokens(
  facet: string,
  values: SummaryValue[],
  { expanded, picking, editing }: { expanded?: boolean; picking?: boolean; editing?: string },
): SummaryToken[] {
  const known = values.filter(({ label }) => label !== null);
  const unknown = values.filter(({ label }) => label === null).map(({ value }) => value);
  const visible = expanded ? known : known.slice(0, MAX_VISIBLE_VALUES);
  const hiddenCount = known.length - visible.length;
  const items: SummaryToken[] = visible.map(({ value, label }) =>
    value === editing
      ? { type: 'picker', facet, replaces: value }
      : typeof label === 'string'
        ? { type: 'value', facet, value, label }
        : { type: 'loading', facet, value },
  );
  if (unknown.length) items.push({ type: 'unknown', facet, values: unknown });
  if (hiddenCount) items.push({ type: 'more', facet, count: hiddenCount });
  if (picking) items.push({ type: 'picker', facet });

  return items.flatMap((token, i) => {
    if (i === 0) return [token];
    if (i === items.length - 1) return [{ type: 'text', text: ' or ' }, token];
    return [{ type: 'text', text: ', ' }, token];
  });
}

/**
 * Dates always read "from A to B". Missing bounds are replaced with the extreme years.
 */
function getDateTokens(filter: DateFilter, itemType: ItemType): SummaryToken[] | null {
  if (typeof filter.min !== 'number' && typeof filter.max !== 'number') return null;

  const { min, max } = getDateFilter(filter);
  return [
    { type: 'text', text: itemType === 'message' ? 'from ' : 'cited in messages from ' },
    { type: 'year', bound: 'min', year: min },
    { type: 'text', text: ' to ' },
    { type: 'year', bound: 'max', year: max },
  ];
}

/**
 * Returns the clause for a keywords facet: "<verb> A, B or C".
 */
function getKeywordsClause(
  facet: string,
  verb: string,
  values: SummaryValue[],
  options: FiltersSummaryOptions,
): SummaryClause {
  return {
    facet,
    tokens: [
      { type: 'text', text: verb + ' ' },
      ...getValuesTokens(facet, values, {
        expanded: options.expandedFacets?.has(facet),
        picking: options.editTarget?.facet === facet && options.editTarget.value === undefined,
        editing: options.editTarget?.facet === facet ? options.editTarget.value : undefined,
      }),
    ],
  };
}

/**
 * MAIN FUNCTIONS
 * **************
 */

export type EditTarget = { facet: string; value?: string };

type FiltersSummaryOptions = {
  state: FiltersState;
  itemType: ItemType;
  count?: number;
  // Labels of entities, by ID (undefined: still loading, null: unknown)
  labels?: Record<string, string | null>;
  // Facets for which all values must be displayed
  expandedFacets?: Set<string>;
  // What is being edited inline: without `value`, a new value (or a new filter, rendered at its
  // place even if not in the state yet), and with `value`, the value being replaced
  editTarget?: EditTarget | null;
};

/**
 * Transforms a filters state into a structured sentence. The text is in the tokens, so that the
 * UI can render each part as it wants (inline inputs, removable chips...).
 */
export function getFiltersSummary(options: FiltersSummaryOptions): FiltersSummary {
  const {
    state: { query, filters = {} },
    itemType,
    count,
    labels = {},
    editTarget,
  } = options;

  // Head: "1,234 verified messages"
  const head: SummaryToken[] = [
    { type: 'count', count },
    { type: 'text', text: ' ' },
  ];
  const verifiedFilter = filters[VERIFIED_FACET.id];
  if (verifiedFilter?.type === 'boolean' && typeof verifiedFilter.value === 'boolean') {
    head.push({ type: 'status', verified: verifiedFilter.value }, { type: 'text', text: ' ' });
  }
  head.push({ type: 'itemType', itemType, plural: count !== 1 });

  const clauses: SummaryClause[] = [];

  // Full-text query:
  if (query || editTarget?.facet === QUERY_FACET_ID) {
    clauses.push({
      facet: QUERY_FACET_ID,
      tokens: [
        { type: 'text', text: QUERY_VERB + ' ' },
        { type: 'query', query: query || '' },
      ],
    });
  }

  // Related entities (the explored type itself is not filterable):
  let previousRelation: Relation | null = null;
  ENTITY_FACETS_ORDER.forEach((facet) => {
    if (facet === itemType) return;
    const filter = filters[facet] as KeywordsFilter | undefined;
    const values = (filter?.type === 'keywords' && filter.values) || [];
    if (!values.length && editTarget?.facet !== facet) return;

    const relation = RELATIONS[itemType][facet];
    const verb = previousRelation?.verb === relation.verb ? relation.repeat : relation.verb;
    previousRelation = relation;
    clauses.push(
      getKeywordsClause(
        facet,
        verb,
        values.map((value) => ({ value, label: labels[value] })),
        options,
      ),
    );
  });

  // Dates:
  const dateFilter = filters[DATE_FACET.id];
  if (dateFilter?.type === 'date') {
    const tokens = getDateTokens(dateFilter, itemType);
    if (tokens) clauses.push({ facet: DATE_FACET.id, tokens });
  }

  // Tags:
  const tagsFilter = filters[TAGS_FACET.id];
  const tags = (tagsFilter?.type === 'keywords' && tagsFilter.values) || [];
  if (tags.length || editTarget?.facet === TAGS_FACET.id) {
    clauses.push(
      getKeywordsClause(
        TAGS_FACET.id,
        TAGS_VERB,
        // Tags are their own labels:
        tags.map((value) => ({ value, label: value })),
        options,
      ),
    );
  }

  return { head, clauses };
}

export function tokenToText(token: SummaryToken): string {
  switch (token.type) {
    case 'text':
      return token.text;
    case 'count':
      return typeof token.count === 'number' ? token.count.toLocaleString(APP_LANGUAGE) : '…';
    case 'itemType':
      return (token.plural ? ITEM_TYPE_LABELS_PLURAL : ITEM_TYPE_LABELS)[token.itemType].toLowerCase();
    case 'status':
      return token.verified ? STATUS_LABELS.verified : STATUS_LABELS.unverified;
    case 'query':
      return token.query ? `"${token.query}"` : '…';
    case 'value':
      return token.facet === TAGS_FACET.id ? `"${token.label}"` : token.label;
    case 'loading':
      return '…';
    case 'unknown':
      return token.values.length > 1
        ? `${token.values.length.toLocaleString(APP_LANGUAGE)} unknown ${getFacetNoun(token.facet, true)}`
        : `an unknown ${getFacetNoun(token.facet, false)}`;
    case 'more':
      return `${token.count.toLocaleString(APP_LANGUAGE)} other ${getFacetNoun(token.facet, token.count > 1)}`;
    case 'year':
      return token.year + '';
    case 'picker':
      return '…';
  }
}

/**
 * Plain text version of the summary, mostly to make the vocabulary easy to read in unit tests.
 */
export function filtersSummaryToText({ head, clauses }: FiltersSummary): string {
  return (
    head.map(tokenToText).join('') +
    clauses.map((clause, i) => getClauseSeparator(i, clauses.length) + clause.tokens.map(tokenToText).join('')).join('')
  );
}
