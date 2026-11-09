import { FC, ReactNode, SVGAttributes } from 'react';
import { ITEM_TYPE_ICONS, ItemType } from '~/core/consts';

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
