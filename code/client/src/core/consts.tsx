import { Facet } from '@ouestware/facets-client';
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

export const ITEM_TYPES = ['company', 'address', 'country', 'people', 'message'] as const;
export const ITEM_TYPES_SET = new Set<string>(ITEM_TYPES);
export type ItemType = (typeof ITEM_TYPES)[number];

export const FILTERABLE_ITEM_TYPES = without(ITEM_TYPES, 'message');
export const FILTERABLE_ITEM_TYPES_SET = new Set(FILTERABLE_ITEM_TYPES);

export const ITEM_TYPE_ICONS: Record<ItemType, IconType> = {
  company: RiBuildingLine,
  address: RiMapPin2Line,
  country: RiFlagLine,
  people: RiUser2Line,
  message: RiArticleLine,
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
  people: 'People',
  message: 'Message',
};

export const ITEM_TYPE_LABELS_PLURAL: Record<ItemType, string> = {
  company: 'Companies',
  address: 'Addresses',
  country: 'Countries',
  people: 'People',
  message: 'Messages',
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
).concat([
  {
    id: 'date',
    type: 'date',
    label: 'Dates',
  },
  {
    id: 'verified',
    type: 'boolean',
    label: 'Verified',
  },
]);

export const FACETS_DICT = keyBy(FACETS, 'id');

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
};
