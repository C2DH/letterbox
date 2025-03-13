import cx from 'classnames';
import { isNil } from 'lodash';
import { useState, type FC, type HTMLAttributes, type PropsWithChildren } from 'react';
import { BsChevronDown, BsChevronRight } from 'react-icons/bs';

type CollapsableProps = HTMLAttributes<HTMLElement> & {
  title: string;
  defaultOpen?: boolean;
};
export const Collaspsable: FC<PropsWithChildren<CollapsableProps>> = ({
  children,
  title,
  defaultOpen,
  ...htmlAttributs
}) => {
  const [show, setShow] = useState(!isNil(defaultOpen) ? defaultOpen : false);
  return (
    <div {...htmlAttributs}>
      <button
        className="btn ps-0"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShow(!show);
        }}
      >
        {show ? <BsChevronDown /> : <BsChevronRight />} {title}
      </button>

      <div className={cx('collapse', show && 'show')}>{children}</div>
    </div>
  );
};
