import { FiltersState } from '@ouestware/facets';
import { describe, expect, test } from 'vitest';

import { ItemType } from '../core/consts';
import { filtersSummaryToText, getFiltersSummary } from './filtersSummary';

/**
 * These tests double as the reference for the vocabulary of the filters summary sentence.
 * Each case reads as: on the <itemType> explore page, with <count> results and <state>, the
 * sentence is <expected>.
 */

// undefined: label still loading, null: unknown entity
const LABELS: Record<string, string | null> = {
  p1: 'Jean Dupont',
  p2: 'Marie Martin',
  p3: 'Paul Durand',
  p4: 'Anne Petit',
  p5: 'Luc Moreau',
  c1: 'Acme SA',
  c2: 'Globex SARL',
  a1: '12 rue Neuve',
  l1: 'Luxembourg',
  l2: 'Belgium',
  unknown1: null,
  unknown2: null,
};

type Case = {
  title: string;
  itemType: ItemType;
  count?: number;
  state: FiltersState;
  expandedFacets?: string[];
  // What is being edited inline: a new filter or value without `value`, a replaced value with it (its input is
  // rendered as "…" in text)
  editTarget?: { facet: string; value?: string };
  expected: string;
};

function check({ itemType, count, state, expandedFacets, editTarget, expected }: Case) {
  const summary = getFiltersSummary({
    state,
    itemType,
    count,
    labels: LABELS,
    expandedFacets: new Set(expandedFacets),
    editTarget,
  });
  expect(filtersSummaryToText(summary)).toBe(expected);
}

const kw = (...values: string[]) => ({ type: 'keywords' as const, values });

describe('Filters summary - head', () => {
  const cases: Case[] = [
    {
      title: 'no filter',
      itemType: 'message',
      count: 12345,
      state: {},
      expected: '12,345 messages',
    },
    {
      title: 'single result uses singular',
      itemType: 'message',
      count: 1,
      state: {},
      expected: '1 message',
    },
    {
      title: 'no result uses plural',
      itemType: 'company',
      count: 0,
      state: {},
      expected: '0 companies',
    },
    {
      title: 'count not loaded yet',
      itemType: 'person',
      state: {},
      expected: '… people',
    },
    {
      title: 'verified status',
      itemType: 'message',
      count: 64,
      state: { filters: { verified: { type: 'boolean', value: true } } },
      expected: '64 verified messages',
    },
    {
      title: 'unverified status',
      itemType: 'address',
      count: 3,
      state: { filters: { verified: { type: 'boolean', value: false } } },
      expected: '3 unverified addresses',
    },
    {
      title: 'status filter without value is ignored',
      itemType: 'message',
      count: 10,
      state: { filters: { verified: { type: 'boolean' } } },
      expected: '10 messages',
    },
  ];

  test.each(cases)('$title', check);
});

describe('Filters summary - full-text query', () => {
  const cases: Case[] = [
    {
      title: 'query only',
      itemType: 'message',
      count: 234,
      state: { query: 'loan' },
      expected: '234 messages matching "loan"',
    },
    {
      title: 'query on other types',
      itemType: 'company',
      count: 18,
      state: { query: 'bank' },
      expected: '18 companies matching "bank"',
    },
  ];

  test.each(cases)('$title', check);
});

describe('Filters summary - related entities, by explored type', () => {
  const cases: Case[] = [
    // Messages: always "linked to"
    {
      title: 'messages, one person',
      itemType: 'message',
      count: 87,
      state: { filters: { person: kw('p1') } },
      expected: '87 messages linked to Jean Dupont',
    },
    {
      title: 'messages, two people (or)',
      itemType: 'message',
      count: 152,
      state: { filters: { person: kw('p1', 'p2') } },
      expected: '152 messages linked to Jean Dupont or Marie Martin',
    },
    {
      title: 'messages, three people',
      itemType: 'message',
      count: 160,
      state: { filters: { person: kw('p1', 'p2', 'p3') } },
      expected: '160 messages linked to Jean Dupont, Marie Martin or Paul Durand',
    },
    {
      title: 'messages, many people are truncated',
      itemType: 'message',
      count: 200,
      state: { filters: { person: kw('p1', 'p2', 'p3', 'p4', 'p5') } },
      expected: '200 messages linked to Jean Dupont, Marie Martin, Paul Durand or 2 other people',
    },
    {
      title: 'messages, one hidden value uses singular',
      itemType: 'message',
      count: 200,
      state: { filters: { person: kw('p1', 'p2', 'p3', 'p4') } },
      expected: '200 messages linked to Jean Dupont, Marie Martin, Paul Durand or 1 other person',
    },
    {
      title: 'messages, many people, expanded',
      itemType: 'message',
      count: 200,
      state: { filters: { person: kw('p1', 'p2', 'p3', 'p4', 'p5') } },
      expandedFacets: ['person'],
      expected: '200 messages linked to Jean Dupont, Marie Martin, Paul Durand, Anne Petit or Luc Moreau',
    },
    {
      title: 'messages, person and company (and)',
      itemType: 'message',
      count: 41,
      state: { filters: { person: kw('p1'), company: kw('c1') } },
      expected: '41 messages linked to Jean Dupont and to Acme SA',
    },
    {
      title: 'messages, all entity types',
      itemType: 'message',
      count: 5,
      state: {
        filters: { country: kw('l1'), address: kw('a1'), company: kw('c1'), person: kw('p1') },
      },
      expected: '5 messages linked to Jean Dupont, to Acme SA, to 12 rue Neuve, and to Luxembourg',
    },

    // Companies
    {
      title: 'companies, person',
      itemType: 'company',
      count: 12,
      state: { filters: { person: kw('p1') } },
      expected: '12 companies linked to Jean Dupont',
    },
    {
      title: 'companies, address',
      itemType: 'company',
      count: 4,
      state: { filters: { address: kw('a1') } },
      expected: '4 companies located at 12 rue Neuve',
    },
    {
      title: 'companies, country',
      itemType: 'company',
      count: 900,
      state: { filters: { country: kw('l1', 'l2') } },
      expected: '900 companies in Luxembourg or Belgium',
    },
    {
      title: 'companies, person, address and country',
      itemType: 'company',
      count: 320,
      state: { filters: { person: kw('p1'), address: kw('a1'), country: kw('l1') } },
      expected: '320 companies linked to Jean Dupont, located at 12 rue Neuve, and in Luxembourg',
    },
    {
      title: 'companies, filter on companies is ignored',
      itemType: 'company',
      count: 320,
      state: { filters: { company: kw('c1') } },
      expected: '320 companies',
    },

    // People
    {
      title: 'people, company',
      itemType: 'person',
      count: 30,
      state: { filters: { company: kw('c1', 'c2') } },
      expected: '30 people linked to Acme SA or Globex SARL',
    },
    {
      title: 'people, address and country',
      itemType: 'person',
      count: 2,
      state: { filters: { address: kw('a1'), country: kw('l1') } },
      expected: '2 people located at 12 rue Neuve and in Luxembourg',
    },

    // Addresses
    {
      title: 'addresses, person and company',
      itemType: 'address',
      count: 7,
      state: { filters: { person: kw('p1'), company: kw('c1') } },
      expected: '7 addresses linked to Jean Dupont and to Acme SA',
    },
    {
      title: 'addresses, country',
      itemType: 'address',
      count: 1500,
      state: { filters: { country: kw('l1') } },
      expected: '1,500 addresses in Luxembourg',
    },

    // Countries
    {
      title: 'countries, company and address',
      itemType: 'country',
      count: 2,
      state: { filters: { company: kw('c1'), address: kw('a1') } },
      expected: '2 countries linked to Acme SA and to 12 rue Neuve',
    },

    // Loading and unknown labels
    {
      title: 'label still loading',
      itemType: 'message',
      count: 3,
      state: { filters: { person: kw('not-loaded-yet') } },
      expected: '3 messages linked to …',
    },
    {
      title: 'one unknown person',
      itemType: 'message',
      count: 3,
      state: { filters: { person: kw('unknown1') } },
      expected: '3 messages linked to an unknown person',
    },
    {
      title: 'one unknown address',
      itemType: 'company',
      count: 3,
      state: { filters: { address: kw('unknown1') } },
      expected: '3 companies located at an unknown address',
    },
    {
      title: 'unknown values are grouped at the end',
      itemType: 'message',
      count: 3,
      state: { filters: { person: kw('unknown1', 'p1', 'unknown2') } },
      expected: '3 messages linked to Jean Dupont or 2 unknown people',
    },
  ];

  test.each(cases)('$title', check);
});

describe('Filters summary - adding a value', () => {
  const cases: Case[] = [
    {
      title: 'after one value',
      itemType: 'person',
      count: 4545,
      state: { filters: { company: kw('c1') } },
      editTarget: { facet: 'company' },
      expected: '4,545 people linked to Acme SA or …',
    },
    {
      title: 'after two values, the first "or" becomes a comma',
      itemType: 'message',
      count: 152,
      state: { filters: { person: kw('p1', 'p2') } },
      editTarget: { facet: 'person' },
      expected: '152 messages linked to Jean Dupont, Marie Martin or …',
    },
    {
      title: 'after truncated values',
      itemType: 'message',
      count: 200,
      state: { filters: { person: kw('p1', 'p2', 'p3', 'p4', 'p5') } },
      editTarget: { facet: 'person' },
      expected: '200 messages linked to Jean Dupont, Marie Martin, Paul Durand, 2 other people or …',
    },
    {
      title: 'tags',
      itemType: 'message',
      count: 64,
      state: { filters: { tags: kw('bank') } },
      editTarget: { facet: 'tags' },
      expected: '64 messages tagged "bank" or …',
    },
    {
      title: 'only the picked facet is affected',
      itemType: 'message',
      count: 41,
      state: { filters: { person: kw('p1'), company: kw('c1') } },
      editTarget: { facet: 'company' },
      expected: '41 messages linked to Jean Dupont and to Acme SA or …',
    },
  ];

  test.each(cases)('$title', check);
});

describe('Filters summary - new filter', () => {
  const cases: Case[] = [
    {
      title: 'entity, alone',
      itemType: 'message',
      count: 10,
      state: {},
      editTarget: { facet: 'person' },
      expected: '10 messages linked to …',
    },
    {
      title: 'entity takes its place in the sentence',
      itemType: 'message',
      count: 64,
      state: { filters: { tags: kw('bank') } },
      editTarget: { facet: 'person' },
      expected: '64 messages linked to … and tagged "bank"',
    },
    {
      title: 'entity reuses the previous verb',
      itemType: 'message',
      count: 87,
      state: { filters: { person: kw('p1') } },
      editTarget: { facet: 'company' },
      expected: '87 messages linked to Jean Dupont and to …',
    },
    {
      title: 'full-text query',
      itemType: 'company',
      count: 18,
      state: { filters: { person: kw('p1') } },
      editTarget: { facet: 'query' },
      expected: '18 companies matching … and linked to Jean Dupont',
    },
    {
      title: 'tags',
      itemType: 'message',
      count: 64,
      state: { filters: { person: kw('p1') } },
      editTarget: { facet: 'tags' },
      expected: '64 messages linked to Jean Dupont and tagged …',
    },
  ];

  test.each(cases)('$title', check);
});

describe('Filters summary - replacing a value', () => {
  const cases: Case[] = [
    {
      title: 'single value',
      itemType: 'message',
      count: 87,
      state: { filters: { person: kw('p1') } },
      editTarget: { facet: 'person', value: 'p1' },
      expected: '87 messages linked to …',
    },
    {
      title: 'value in the middle keeps its position',
      itemType: 'message',
      count: 160,
      state: { filters: { person: kw('p1', 'p2', 'p3') } },
      editTarget: { facet: 'person', value: 'p2' },
      expected: '160 messages linked to Jean Dupont, … or Paul Durand',
    },
    {
      title: 'last value',
      itemType: 'message',
      count: 152,
      state: { filters: { person: kw('p1', 'p2') } },
      editTarget: { facet: 'person', value: 'p2' },
      expected: '152 messages linked to Jean Dupont or …',
    },
    {
      title: 'tag',
      itemType: 'message',
      count: 64,
      state: { filters: { tags: kw('bank', 'insurance') } },
      editTarget: { facet: 'tags', value: 'bank' },
      expected: '64 messages tagged … or "insurance"',
    },
    {
      title: 'only the edited facet is affected',
      itemType: 'message',
      count: 41,
      state: { filters: { person: kw('p1'), company: kw('c1') } },
      editTarget: { facet: 'company', value: 'c1' },
      expected: '41 messages linked to Jean Dupont and to …',
    },
  ];

  test.each(cases)('$title', check);
});

describe('Filters summary - dates', () => {
  // Extreme years come from the client config (currently 1900 and 2016)
  const d = (min?: number, max?: number) => ({ filters: { date: { type: 'date' as const, min, max } } });
  const cases: Case[] = [
    // Messages have a date:
    {
      title: 'messages, min and max',
      itemType: 'message',
      count: 530,
      state: d(1920, 1930),
      expected: '530 messages from 1920 to 1930',
    },
    {
      title: 'messages, min only uses the last year as max',
      itemType: 'message',
      count: 210,
      state: d(1925),
      expected: '210 messages from 1925 to 2016',
    },
    {
      title: 'messages, max only uses the first year as min',
      itemType: 'message',
      count: 98,
      state: d(undefined, 1918),
      expected: '98 messages from 1900 to 1918',
    },
    {
      title: 'messages, single year',
      itemType: 'message',
      count: 40,
      state: d(1920, 1920),
      expected: '40 messages from 1920 to 1920',
    },
    {
      title: 'messages, extreme years (filter just added)',
      itemType: 'message',
      count: 12345,
      state: d(1900, 2016),
      expected: '12,345 messages from 1900 to 2016',
    },

    // Other items are dated through the messages they are cited in:
    {
      title: 'companies, min and max',
      itemType: 'company',
      count: 320,
      state: d(1920, 1930),
      expected: '320 companies cited in messages from 1920 to 1930',
    },
    {
      title: 'people, max only',
      itemType: 'person',
      count: 98,
      state: d(undefined, 1918),
      expected: '98 people cited in messages from 1900 to 1918',
    },

    {
      title: 'empty date filter is ignored',
      itemType: 'message',
      count: 40,
      state: d(),
      expected: '40 messages',
    },
  ];

  test.each(cases)('$title', check);
});

describe('Filters summary - tags', () => {
  const cases: Case[] = [
    {
      title: 'one tag',
      itemType: 'message',
      count: 64,
      state: { filters: { tags: kw('bank') } },
      expected: '64 messages tagged "bank"',
    },
    {
      title: 'two tags (or)',
      itemType: 'company',
      count: 64,
      state: { filters: { tags: kw('bank', 'insurance') } },
      expected: '64 companies tagged "bank" or "insurance"',
    },
    {
      title: 'many tags are truncated',
      itemType: 'message',
      count: 64,
      state: { filters: { tags: kw('bank', 'loan', 'tax', 'insurance', 'trust') } },
      expected: '64 messages tagged "bank", "loan", "tax" or 2 other tags',
    },
    {
      title: 'empty tags filter is ignored',
      itemType: 'message',
      count: 64,
      state: { filters: { tags: kw() } },
      expected: '64 messages',
    },
  ];

  test.each(cases)('$title', check);
});

describe('Filters summary - everything combined', () => {
  const cases: Case[] = [
    {
      title: 'messages',
      itemType: 'message',
      count: 12,
      state: {
        query: 'loan',
        filters: {
          verified: { type: 'boolean', value: true },
          person: kw('p1', 'p2'),
          company: kw('c1'),
          country: kw('l1'),
          date: { type: 'date', min: 1920, max: 1930 },
          tags: kw('bank'),
        },
      },
      expected:
        '12 verified messages matching "loan", linked to Jean Dupont or Marie Martin, to Acme SA, to Luxembourg, from 1920 to 1930, and tagged "bank"',
    },
    {
      title: 'companies',
      itemType: 'company',
      count: 3,
      state: {
        query: 'bank',
        filters: {
          verified: { type: 'boolean', value: false },
          person: kw('p1'),
          address: kw('a1'),
          date: { type: 'date', max: 1945 },
        },
      },
      expected:
        '3 unverified companies matching "bank", linked to Jean Dupont, located at 12 rue Neuve, and cited in messages from 1900 to 1945',
    },
  ];

  test.each(cases)('$title', check);
});
