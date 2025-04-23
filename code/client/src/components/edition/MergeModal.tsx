import { Spinner } from '@ouestware/loaders';
import { Modal, useModal } from '@ouestware/modals';
import { flatten, reverse, sortBy, sum, toPairs } from 'lodash';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

import { ItemIcon, ItemType } from '../../core/consts';
import { ItemCart, useEditionContext } from '../../core/edition';
import { DataItemType } from '../../core/graphql';
import { useItemActions } from '../../hooks/useItemActions';
import { Collapsable } from '../Collapsable';
import { EditionIcons } from './EditionIcons';

interface MergeModalProps {
  itemsByType: ItemCart;
}
const TYPE_OPTIONS = ['address', 'company', 'country', 'person'] as const;

type MergeableTypes = (typeof TYPE_OPTIONS)[number];

export const MergeModal: FC<MergeModalProps> = ({ itemsByType }) => {
  const { closeModal } = useModal();
  const { mergeItems } = useItemActions();
  const { removeFromCart } = useEditionContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const largestType = reverse(sortBy(toPairs(itemsByType), ([_, values]) => values.length))[0];
  const [mergePayload, setMergePayload] = useState<Partial<{ type: MergeableTypes; name: string }>>(
    { type: largestType[0] as MergeableTypes, name: largestType[1][0].label },
  );

  return (
    <Modal
      title={<h2 className="with-icon">{EditionIcons.merge} Merging</h2>}
      withCloseButton={!loading}
    >
      <form
        id="mergeItemsForm"
        onSubmit={async (e) => {
          e.preventDefault();
          if (mergePayload.type && mergePayload.name) {
            setLoading(true);
            const mergedItem = await mergeItems(
              mergePayload.type as DataItemType,
              mergePayload.name,
              flatten(
                toPairs(itemsByType).map(([type, values]) =>
                  values.map((v) => ({ id: v.id, type: type as DataItemType })),
                ),
              ),
            );
            setLoading(false);
            if (mergedItem && 'id' in mergedItem) {
              navigate(`${mergePayload.type}/${mergedItem.id}`);
              //TODO: remove items from cart
              for (const _type in itemsByType) {
                const type = _type as MergeableTypes;
                if (itemsByType[type])
                  itemsByType[type].forEach((item) => removeFromCart({ type, id: item.id }));
              }
            }
            closeModal();
          }
        }}
      >
        <p className="mb-2">
          You are about to merge {sum(toPairs(itemsByType).map(([_, items]) => items.length))}{' '}
          items. All messages mentioning those items will be linked to the new merged item.
        </p>
        <Collapsable title="Source" defaultOpen={true} className="mb-4">
          <div className="ms-3 d-flex flex-column">
            {toPairs(itemsByType).map(([type, items]) =>
              items.map((item) => (
                <a href={`/${type}/${item.id}`} key={item.id} className="with-icon">
                  <ItemIcon type={type as ItemType} /> {item.label}
                </a>
              )),
            )}
          </div>
        </Collapsable>
        <h3>New Item</h3>
        <div className="row mb-3 px-3">
          <div className="col-6">
            <label className="form-label" htmlFor="typeSelect">
              Type
            </label>
            <Select
              id="typeSelect"
              options={TYPE_OPTIONS.map((o) => ({ value: o, label: o }))}
              value={{ value: mergePayload.type }}
              formatOptionLabel={(option) => {
                return (
                  <>
                    <ItemIcon type={option.value as ItemType} /> {option.value}
                  </>
                );
              }}
              onChange={(value) =>
                setMergePayload({
                  ...mergePayload,
                  type: value?.value,
                })
              }
            />
          </div>
          <div className="col-6">
            <label className="form-label">Name</label>
            <input
              type="text"
              value={mergePayload.name || ''}
              className="from-control"
              onChange={(e) => {
                setMergePayload({ ...mergePayload, name: e.target.value || undefined });
              }}
            />
          </div>
        </div>
        {/* TODO: tags and verified? requires to update merge API route  */}
        {/* <div className="row mb-3 px-3">
          <div className="col-12">
            <label className="form-label">Tags</label>
            <Select />
          </div>
        </div>
        <div className="row px-3">
          <div className="col-6">
            <div className="form-check form-switch">
              <label className="form-label">Set as Verified</label>
              <input className="form-check-input" type="checkbox" />
            </div>
          </div>
        </div> */}
      </form>
      <div className="col d-flex justify-content-between">
        <button
          className="btn btn-outline-danger"
          type="button"
          onClick={closeModal}
          disabled={loading}
        >
          Cancel
        </button>
        <button className="btn btn-success" type="submit" form="mergeItemsForm" disabled={loading}>
          {loading && <Spinner />} Merge
        </button>
      </div>
    </Modal>
  );
};
