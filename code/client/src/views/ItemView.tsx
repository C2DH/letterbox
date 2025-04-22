import { LoaderFill } from '@ouestware/loaders';
import cx from 'classnames';
import { ReactNode, useMemo, type FC } from 'react';
import { RiAddCircleLine, RiFile3Line } from 'react-icons/ri';
import { useParams } from 'react-router-dom';

import { Collapsable } from '../components/Collapsable';
import { ItemCard } from '../components/items/card/ItemCard.tsx';
import { ListWithLoadMore, type ListWithLoadMoreProps } from '../components/ListWithLoadMore';
import { Sidebar } from '../components/navigation/Sidebar.tsx';
import {
  ITEM_TYPE_LABELS,
  ITEM_TYPE_LABELS_PLURAL,
  ITEM_TYPE_TO_COUNT_FIELD,
  ITEM_TYPE_TO_FIELD,
  ITEM_TYPES,
  ITEM_TYPES_SET,
  ItemIcon,
  ItemType,
} from '../core/consts.tsx';
import { useEditionContext } from '../core/edition.ts';
import { NodeItem } from '../core/graphql';
import { useLoadItemData } from '../hooks/useItem.tsx';
import { getMessageName } from '../utils/data.ts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RelatedDefinition<T = any> = ListWithLoadMoreProps<T> & { title: ReactNode };

export const ItemView: FC = () => {
  const { enabled } = useEditionContext();
  const { id, type: inputType } = useParams();
  const itemType = useMemo(() => {
    if (!inputType) throw new Error(`Item type is missing.`);
    if (!ITEM_TYPES_SET.has(inputType)) throw new Error(`Type ${inputType} is not handled yet.`);
    return inputType as ItemType;
  }, [inputType]);
  const loadItemData = useLoadItemData(itemType, id);
  const { loading, itemData, fetchRelations } = loadItemData;

  const relatedItems = useMemo(
    () =>
      itemData
        ? ITEM_TYPES.flatMap((type) => {
            if (type === itemType) return [];

            const listKey = ITEM_TYPE_TO_FIELD[type];
            const countKey = ITEM_TYPE_TO_COUNT_FIELD[type];

            return [
              {
                title: (
                  <span className="fs-2">
                    <ItemIcon type={type} /> {ITEM_TYPE_LABELS_PLURAL[type]} (
                    {itemData[countKey as keyof NodeItem]})
                  </span>
                ),
                data: itemData[listKey as keyof NodeItem],
                total: itemData[countKey as keyof NodeItem],
                fetch: fetchRelations.bind(null, type),
                getItemKey: (data: NodeItem) => data.id,
                renderItem: (data: NodeItem) => (
                  <div className={cx('mb-4', type === 'message' ? 'col-4' : 'col-2')}>
                    <ItemCard data={data} itemType={type} />
                  </div>
                ),
              } as RelatedDefinition,
            ];
          })
        : [],
    [itemData, itemType, fetchRelations],
  );

  const name = !itemData
    ? ITEM_TYPE_LABELS[itemType]
    : itemData.__typename === 'Message'
      ? getMessageName(itemData)
      : 'name' in itemData
        ? itemData.name
        : itemData.id;

  return (
    <>
      <Sidebar />

      {itemData && (
        <main className="p-4 py-5">
          <section className="mb-4">
            <h1 className="with-icon">
              <ItemIcon type={itemType} /> {name}
            </h1>
            {'year' in itemData && <div className="text-muted">Dated to: {itemData.year}</div>}
          </section>

          {relatedItems.map((related, index) => (
            <Collapsable key={index} title={related.title} className="mb-2" defaultOpen>
              {enabled && (
                <div className="mb-3">
                  <button className="btn btn-purple-300 with-icon">
                    <RiAddCircleLine /> Add item
                  </button>
                </div>
              )}
              <ListWithLoadMore className="row" {...related} />
            </Collapsable>
          ))}

          {itemData.__typename === 'Message' && (
            <section>
              <h2 className="with-icon fw-medium mb-4">
                <RiFile3Line /> Source
              </h2>

              <section className="mb-3">
                <h3 className="fs-6 fw-medium">Original document</h3>
                <article>TODO</article>
              </section>

              <section className="mb-3">
                <h3 className="fs-6 fw-medium">Extracted data</h3>
                <article style={{ maxWidth: 580 }}>{itemData.message}</article>
              </section>

              <section className="mb-3">
                <h3 className="fs-6 fw-medium">Download sources</h3>
                <div>
                  <button className="btn btn-dark me-2">Original document</button>
                  <button className="btn btn-dark me-2">Extracted data</button>
                  <button className="btn btn-dark me-2">Edited data</button>
                </div>
              </section>
            </section>
          )}
          {itemData.__typename !== 'Message' &&
            'otherNames' in itemData &&
            itemData.otherNames &&
            itemData.otherNames.length > 1 && (
              <section>
                <h2 className="with-icon fw-medium mb-4">
                  <RiFile3Line /> Source
                </h2>

                <section className="mb-3">
                  <h3 className="fs-6 fw-medium">Other names</h3>
                  <article style={{ maxWidth: 580 }}>{itemData.otherNames.join(', ')}</article>
                </section>
              </section>
            )}
        </main>
      )}

      {loading && <LoaderFill />}
    </>
  );
};
