import { Fragment, useCallback, useEffect, useState, type ReactNode } from 'react';

export interface ListWithLoadMoreProps<T> {
  data?: T[];
  fetch: (skip: number, limit: number) => Promise<T[]>;
  renderItem: (item: T) => ReactNode;
  getItemKey?: (item: T) => string;
  renderLoader?: () => ReactNode;
  total?: number;
}
export function ListWithLoadMore<T>({
  data,
  fetch,
  renderItem,
  renderLoader,
  getItemKey,
  total,
}: ListWithLoadMoreProps<T>) {
  const [items, setItems] = useState<T[]>(data || []);
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
    if (total && items.length >= total) {
      setHasMore(false);
    }
  }, [total, items]);

  return (
    <div>
      {items.map((item, index) => (
        <Fragment key={getItemKey ? getItemKey(item) : index}>{renderItem(item)}</Fragment>
      ))}
      {loading && (renderLoader ? renderLoader() : <div>Loading...</div>)}
      {hasMore && <button onClick={fetchMore}>Load more</button>}
    </div>
  );
}
