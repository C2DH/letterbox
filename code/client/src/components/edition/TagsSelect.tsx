import { useLazyQuery, useMutation } from '@apollo/client';
import { FC, useCallback, useState } from 'react';
import { Props } from 'react-select';
import Select from 'react-select/async-creatable';

import {
  ITEM_TYPE_TO_DATA_TYPE,
  ITEM_TYPE_TO_FIELD,
  ItemType,
  REACT_SELECT_BASE_PROPS,
} from '../../core/consts';
import { NodeItem } from '../../core/graphql';
import { setTagsMutation } from '../../core/graphql/queries/actions';
import { aggregateItems } from '../../core/graphql/queries/search';

export const TagsSelect: FC<{ item: Pick<NodeItem, 'id' | 'tags'> & { type: ItemType } }> = ({
  item,
}) => {
  const [_setTags] = useMutation(setTagsMutation);
  const [autocompleteTags] = useLazyQuery(aggregateItems);
  const [tags, setTags] = useState<{ label: string; value: string }[]>(
    item.tags?.map((t) => ({ label: t as string, value: t as string })) || [],
  );
  console.log(tags);
  const updateTags = useCallback(
    (tags: string[]) => {
      return _setTags({
        variables: { type: ITEM_TYPE_TO_DATA_TYPE[item.type], id: item.id, tags },
      });
    },
    [item.id, item.type, _setTags],
  );

  return (
    <Select<{ label: string; value: string }, true>
      {...(REACT_SELECT_BASE_PROPS as Props<{ label: string; value: string }>)}
      className="tag-select"
      placeholder="Search and add exiting tags..."
      value={tags}
      loadOptions={async (input: string) => {
        const tags = await autocompleteTags({
          variables: {
            itemType: ITEM_TYPE_TO_DATA_TYPE[item.type],
            field: ITEM_TYPE_TO_FIELD.tags,
            filters: {},
            includes: input,
          },
        });
        return tags.data?.aggregate.values.map((v) => ({ label: v.label, value: v.id })) || [];
      }}
      onChange={(values) => {
        setTags([...values]);
        updateTags(values.map((v) => v.label));
      }}
      isMulti
    />
  );
};
