import { RiArrowDownSLine } from 'react-icons/ri';
import { Props } from 'react-select';
import { ItemValue } from '~/core/consts';

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
