import { LoaderFill } from '@ouestware/loaders';
import cx from 'classnames';
import { ReactNode, useMemo, type FC } from 'react';
import { RiFile3Line, RiPriceTag3Line } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';

import { Collapsable } from '../components/Collapsable';
import { InCartButton } from '../components/edition/InCartButton.tsx';
import { TagsSelect } from '../components/edition/TagsSelect.tsx';
import { ToggleVerified } from '../components/edition/ToggleVerified.tsx';
import { EditionActionsTooltip } from '../components/edition/tooltips.tsx';
import { ItemCard } from '../components/items/card/ItemCard.tsx';
import { ItemDeleted } from '../components/items/ItemDeleted.tsx';
import { ListWithLoadMore, type ListWithLoadMoreProps } from '../components/ListWithLoadMore';
import { Sidebar } from '../components/navigation/Sidebar.tsx';
import { PdfViewer } from '../components/pdfViewer.tsx';
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
import { useItemCounts } from '../hooks/useItemCounts.ts';
import { getMessageName } from '../utils/data.ts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RelatedDefinition<T = any> = ListWithLoadMoreProps<T> & { title: ReactNode; type: ItemType };

export const ItemView: FC = () => {
  const { enabled } = useEditionContext();
  const { id, type: inputType } = useParams();
  const itemType = useMemo(() => {
    if (!inputType) throw new Error(`Item type is missing.`);
    if (!ITEM_TYPES_SET.has(inputType)) throw new Error(`Type ${inputType} is not handled yet.`);
    return inputType as ItemType;
  }, [inputType]);
  const { loading, itemData, fetchRelations } = useLoadItemData(itemType, id);
  const { itemCounts } = useItemCounts(itemType, id || '');

  const editionEnabled = useMemo(() => {
    return enabled && itemData && !itemData.deleted;
  }, [enabled, itemData]);

  const fromMessageId = useMemo(() => (itemType === 'message' ? id : undefined), [itemType, id]);

  const relatedItems = useMemo(
    () =>
      itemData
        ? ITEM_TYPES.flatMap((type) => {
            const listKey = ITEM_TYPE_TO_FIELD[type];
            if (itemData[listKey as keyof NodeItem] === undefined) return [];

            const countKey = ITEM_TYPE_TO_COUNT_FIELD[type];
            const total =
              itemCounts !== null ? itemCounts[countKey as keyof typeof itemCounts] : undefined;

            return [
              {
                type,
                title: (
                  <span className="fs-2">
                    <ItemIcon type={type} /> {ITEM_TYPE_LABELS_PLURAL[type]} {total && `(${total})`}
                  </span>
                ),
                data: itemData[listKey as keyof NodeItem],
                total,
                fetch: fetchRelations.bind(null, type),
                getItemKey: (data: NodeItem) => data.id,
                renderItem: (data: NodeItem) => (
                  <div className={cx('mb-4', type === 'message' ? 'col-4' : 'col-2')}>
                    <ItemCard data={data} itemType={type} fromMessageId={fromMessageId} />
                  </div>
                ),
              } as RelatedDefinition,
            ];
          })
        : [],
    [itemData, fetchRelations, fromMessageId, itemCounts],
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
            <h1 className="d-flex align-items-center gap-2">
              <span className="with-icon">
                <ItemIcon type={itemType} /> {name}
              </span>
              {editionEnabled && (
                <>
                  <InCartButton type={itemType} id={itemData.id} label={name} />
                  <EditionActionsTooltip itemType={itemType} id={itemData.id} label={name} />
                </>
              )}
              <ItemDeleted item={itemData} />
            </h1>
            {'year' in itemData && <div className="text-muted">Dated to: {itemData.year}</div>}
            <ToggleVerified item={{ ...itemData, type: itemType }} />
          </section>

          <section className="mb-4">
            <h2 className="with-icon fw-medium mb-4">
              <RiPriceTag3Line /> Tags
            </h2>
            <TagsSelect item={{ ...itemData, type: itemType }} />
          </section>

          {relatedItems.map((related, index) => (
            <Collapsable key={index} title={related.title} className="mb-2" defaultOpen>
              <div className="mb-3 d-flex gap-1">
                <Link
                  to={`/explore/${related.type}?${inputType}|values=${id}#result`}
                  className="btn btn-dark"
                >
                  View in explore page
                </Link>
                {/* {editionEnabled && (
                  <button className="btn btn-purple-300 with-icon">
                    <RiAddCircleLine /> Add item
                  </button>
                )} */}
              </div>
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
                <PdfViewer
                  className="w-100"
                  filepath={`${itemData.year}/${itemData.filename}`}
                  pageNumber={itemData.pageNumber}
                />
              </section>

              <section className="mb-3">
                <h3 className="fs-6 fw-medium">Extracted data</h3>
                <article style={{ maxWidth: 580 }}>{itemData.message}</article>loadItemData
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
