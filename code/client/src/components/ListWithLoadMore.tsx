import { Spinner } from '@ouestware/loaders';
import {
  Fragment,
  useCallback,
  useEffect,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

export type ListWithLoadMoreProps<T> = HTMLAttributes<HTMLElement> & {
  fetch: (skip: number, limit: number) => Promise<T[]>;
  renderItem: (item: T) => ReactNode;
  renderLoader?: () => ReactNode;
  getItemKey?: (item: T) => string;
  total?: number;
};
export function ListWithLoadMore<T>({
  fetch,
  renderItem,
  renderLoader,
  getItemKey,
  total,
  ...htmlAttributs
}: ListWithLoadMoreProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMore = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetch(items.length, 20);
      if (result.length < 20) setHasMore(false);
      setItems([...items, ...result]);
    } finally {
      setLoading(false);
    }
  }, [fetch, items]);

  useEffect(() => {
    if (typeof total === 'number' && items.length >= total) {
      setHasMore(false);
    }
  }, [total, items]);

  useEffect(() => {
    fetchMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div {...htmlAttributs}>
        {items.map((item, index) => (
          <Fragment key={getItemKey ? getItemKey(item) : index}>{renderItem(item)}</Fragment>
        ))}
      </div>

      {hasMore && (
        <button
          disabled={loading}
          className="btn btn-primary d-flex align-items-center mb-3"
          onClick={fetchMore}
        >
          Load more
          {loading && <Spinner className="ms-1 fs-4" style={{ width: '1em', height: '1em' }} />}
        </button>
      )}
    </>
  );
}
