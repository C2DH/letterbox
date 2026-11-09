import { Spinner } from '@ouestware/loaders';
import { Fragment, type HTMLAttributes, type ReactNode, useEffect, useState } from 'react';

export type ListWithLoadMoreProps<T> = HTMLAttributes<HTMLElement> & {
  fetch: (skip: number, limit: number) => Promise<T[]>;
  renderItem: (item: T) => ReactNode;
  getItemKey?: (item: T) => string;
  total?: number;
};
export function ListWithLoadMore<T>({
  fetch,
  renderItem,
  getItemKey,
  total,
  ...htmlAttributs
}: ListWithLoadMoreProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMoreFromApi, setHasMoreFromApi] = useState(true);
  const hasMore = hasMoreFromApi && (typeof total !== 'number' || items.length < total);

  async function fetchMore(skip: number = 0) {
    setLoading(true);
    try {
      const result = await fetch(skip, 20);
      if (result.length < 20) setHasMoreFromApi(false);
      setItems((prev) => (skip === 0 ? result : [...prev, ...result]));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
          className="btn btn-primary d-flex align-items-center mb-3 mx-auto"
          onClick={() => fetchMore(items.length)}
        >
          Load more
          {loading && <Spinner className="ms-1 fs-4" style={{ width: '1em', height: '1em' }} />}
        </button>
      )}
    </>
  );
}
