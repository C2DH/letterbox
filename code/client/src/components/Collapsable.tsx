import cx from 'classnames';
import { isNil } from 'lodash';
import { ReactNode, useState, type FC, type HTMLAttributes, type PropsWithChildren } from 'react';
import { RiArrowDownSLine, RiArrowRightSLine } from 'react-icons/ri';

type CollapsableProps = HTMLAttributes<HTMLElement> & {
  title: ReactNode;
  defaultOpen?: boolean;
};
export const Collapsable: FC<PropsWithChildren<CollapsableProps>> = ({
  children,
  title,
  defaultOpen,
  ...htmlAttributs
}) => {
  const [show, setShow] = useState(!isNil(defaultOpen) ? defaultOpen : false);
  return (
    <section {...htmlAttributs}>
      <button
        className="btn ps-0 with-icon fw-medium mb-1"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShow(!show);
        }}
      >
        {show ? <RiArrowDownSLine /> : <RiArrowRightSLine />} {title}
      </button>

      <div className={cx('collapse', show && 'show')}>{children}</div>
    </section>
  );
};
