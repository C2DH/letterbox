import { Facet, ValueWithCount } from '@ouestware/facets-client';
import { keyBy, without } from 'lodash';
import { FC, ReactNode, SVGAttributes } from 'react';
import type { IconType } from 'react-icons';
import {
  RiArrowDownSLine,
  RiArticleLine,
  RiBuildingLine,
  RiFlagLine,
  RiMapPin2Line,
  RiUser2Line,
} from 'react-icons/ri';
import { Props } from 'react-select';

import { AggregationFields, DataItemType } from './graphql';

export const APP_LANGUAGE = 'en-US';

export const ITEM_TYPES = ['company', 'address', 'people', 'country', 'message'] as const;
export const ITEM_TYPES_SET = new Set<string>(ITEM_TYPES);
export type ItemType = (typeof ITEM_TYPES)[number];

export const FILTERABLE_ITEM_TYPES = without(ITEM_TYPES, 'message');
export const FILTERABLE_ITEM_TYPES_SET = new Set(FILTERABLE_ITEM_TYPES);

export const CompanyIcon = RiBuildingLine;
export const AddressIcon = RiMapPin2Line;
export const CountryIcon = RiFlagLine;
export const PeopleIcon = RiUser2Line;
export const MessageIcon = RiArticleLine;

export const ITEM_TYPE_ICONS: Record<ItemType, IconType> = {
  company: CompanyIcon,
  address: AddressIcon,
  country: CountryIcon,
  people: PeopleIcon,
  message: MessageIcon,
};

interface IconBaseProps extends SVGAttributes<SVGElement> {
  children?: ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
}
export const ItemIcon: FC<Omit<IconBaseProps, 'type'> & { type: ItemType }> = ({
  type,
  ...props
}) => {
  const Component = ITEM_TYPE_ICONS[type];
  return <Component {...props} />;
};

export const ITEM_TYPE_LABELS: Record<ItemType, string> = {
  company: 'Company',
  address: 'Address',
  country: 'Country',
  people: 'Person',
  message: 'Message',
};

export const ITEM_TYPES_AFFINITIES: Record<ItemType, Set<ItemType>> = {
  company: new Set(['address', 'people']),
  address: new Set(['people', 'company']),
  country: new Set(['address', 'people', 'company', 'country']),
  people: new Set(['people', 'company']),
  message: new Set(['address', 'people', 'company', 'country']),
};

export const ITEM_TYPE_TO_FIELD = {
  company: AggregationFields.Companies,
  address: AggregationFields.Addresses,
  country: AggregationFields.Countries,
  people: AggregationFields.People,
  tags: AggregationFields.Tags,
  message: 'messages',
} as const;

export const ITEM_TYPE_TO_COUNT_FIELD = {
  company: 'companiesCount',
  address: 'addressesCount',
  country: 'countriesCount',
  people: 'peopleCount',
  message: 'messagesCount',
} as const;

export const ITEM_TYPE_TO_DATA_TYPE = {
  company: DataItemType.Company,
  address: DataItemType.Address,
  country: DataItemType.Country,
  people: DataItemType.Person,
  message: DataItemType.Message,
} as const;

export const ITEM_TYPE_LABELS_PLURAL: Record<ItemType, string> = {
  company: 'Companies',
  address: 'Addresses',
  country: 'Countries',
  people: 'People',
  message: 'Messages',
};

export const VERIFIED_FACET = {
  id: 'verified',
  type: 'boolean',
  label: 'Verified',
};
export const DATE_FACET = {
  id: 'date',
  type: 'date',
  label: 'Dates',
};
export const TAGS_FACET = {
  id: 'tags',
  type: 'keywords',
  label: 'Tags',
  autocomplete: true,
  histogram: false,
  isMulti: true,
};

export const FACETS = FILTERABLE_ITEM_TYPES.map(
  (itemType) =>
    ({
      id: itemType,
      type: 'keywords',
      label: ITEM_TYPE_LABELS_PLURAL[itemType],
      isMulti: true,
      histogram: true,
      placeholder: true,
      autocomplete: true,
    }) as Facet,
).concat([DATE_FACET as Facet, VERIFIED_FACET as Facet, TAGS_FACET as Facet]);

export const FACETS_DICT = keyBy(FACETS, 'id');

export type ItemValue = ValueWithCount & { link?: string; label?: string };

export const REACT_SELECT_BASE_PROPS: Partial<Props> = {
  classNames: {
    valueContainer: () => 'form-control px-3',
    control: () => 'input-group',
    indicatorSeparator: () => 'd-none',
    indicatorsContainer: () => 'input-group-text',
    multiValue: () => 'm-0 me-2',
  },
  styles: {
    control: () => ({}),
    placeholder: (base) => ({ ...base, marginLeft: 0 }),
  },
  components: {
    DropdownIndicator: () => <RiArrowDownSLine />,
  },
  getOptionLabel: (o) => (o as ItemValue).label || (o as ItemValue).value,
};
