import cx from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type HeaderProps = Partial<HTMLElement>;
export const Header: FC<HeaderProps> = ({ className }) => (
  <header className={cx('navbar', className)}>
    <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" to={'/'}>
      letterBox
    </Link>
  </header>
);
