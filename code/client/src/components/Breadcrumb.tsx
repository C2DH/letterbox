import cx from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  items: { url?: string; title?: string; content: JSX.Element | string }[];
}
export const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
  const lastElementId = items.length - 1;

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map(({ url, title, content }, i) => {
          return (
            <li
              key={`${url}-${i}`}
              className={cx('breadcrumb-item', i === lastElementId && 'active')}
            >
              {url ? (
                <Link to={url} title={title}>
                  {content}
                </Link>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
