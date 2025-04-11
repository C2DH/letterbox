import cx from 'classnames';
import { isNil } from 'lodash';
import { useState, type FC, type HTMLAttributes, type PropsWithChildren } from 'react';
import { RiArrowDownSLine, RiArrowRightSLine } from 'react-icons/ri';

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
        className="btn ps-0 with-icon"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShow(!show);
        }}
      >
        {show ? <RiArrowDownSLine /> : <RiArrowRightSLine />} {title}
      </button>

      <div className={cx('collapse', show && 'show')}>{children}</div>
    </div>
  );
};
