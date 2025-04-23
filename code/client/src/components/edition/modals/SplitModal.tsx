import { Spinner } from '@ouestware/loaders';
import { Modal, useModal } from '@ouestware/modals';
import { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ItemIcon, ItemType } from '../../../core/consts';
import { useEditionContext } from '../../../core/edition';
import { DataItemType } from '../../../core/graphql';
import { useItemActions } from '../../../hooks/useItemActions';
import { isInCart } from '../../../utils/edition';
import { EditionIcons } from '../EditionIcons';

interface SplitModalProps {
  item: {
    type: ItemType;
    id: string;
    label: string;
  };
}

export const SplitModal: FC<SplitModalProps> = ({ item }) => {
  const { closeModal } = useModal();
  const { splitItem } = useItemActions();
  const { cart, removeFromCart } = useEditionContext();

  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState<boolean>(false);

  const [newNames, setNewNames] = useState<string[]>([`${item.label} 1`, `${item.label} 2`]);
  const [newName, setNewName] = useState<string>('');

  return (
    <Modal
      title={<h2 className="with-icon">{EditionIcons.split} Split</h2>}
      withCloseButton={!loading}
    >
      <form
        id="mergeItemsForm"
        onSubmit={async (e) => {
          e.preventDefault();
          if (newNames.length > 1) {
            setLoading(true);
            try {
              const createdItems = await splitItem(item.type as DataItemType, item.id, newNames);
              if (isInCart(cart, item)) {
                removeFromCart(item);
              }
              if (location.pathname === `/${item.type}/${item.id}`) {
                //if we were on the splitted item page let's redirect to home
                if (createdItems && createdItems.length > 0 && 'id' in createdItems[0])
                  navigate(`/${item.type}/${createdItems[0].id}`);
              }
              // else let's refresh the page
              else navigate(0);
              closeModal();
            } finally {
              setLoading(false);
            }
          }
        }}
      >
        <p className="mb-1">
          You are about to split the ${item.type} &quot;{item.label}&quot;. All messages mentioning
          is will be linked to the new created items.
        </p>
        <div className="row mb-3">
          <a href={`/${item.type}/${item.id}`} key={item.id} className="with-icon">
            <ItemIcon type={item.type as ItemType} /> {item.label}
          </a>
        </div>
        <h3>
          New Items <span className="badge rounded-pill bg-dark">{newNames.length}</span>
        </h3>
        <h4>Split in another item</h4>
        <div className="row mb-3">
          <div className="col-10">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="form-control"
              placeholder="New items's name"
            />
          </div>
          <div className="col-2">
            <button
              type="button"
              className="btn btn-purple-300"
              onClick={() => {
                setNewNames([...newNames, newName]);
                setNewName('');
              }}
            >
              Add
            </button>
          </div>
        </div>
        <div className="px-3">
          {newNames.map((nn, i) => (
            <div key={`${i}${nn}`} className="mb-3 row ">
              <div className="col-10 d-flex align-items-center gap-2">
                <label className="with-icon flex-shrink-0">
                  <ItemIcon type={item.type} />
                  {i + 1}
                </label>
                <input
                  type="text"
                  value={nn}
                  className="form-control"
                  onChange={(e) => {
                    setNewNames(newNames.map((_n, n_i) => (n_i === i ? e.target.value : _n)));
                  }}
                />
              </div>
              <button
                type="button"
                className="btn btn-outline-dark col-2"
                onClick={() => setNewNames(newNames.filter((_, ii) => ii !== i))}
              >
                delete
              </button>
            </div>
          ))}
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
          {loading && <Spinner />} Split
        </button>
      </div>
    </Modal>
  );
};
