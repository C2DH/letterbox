import {
  RiBookmarkFill,
  RiBookmarkLine,
  RiDeleteBin5Line,
  RiInputField,
  RiMergeCellsVertical,
  RiScissorsCutLine,
  RiSubtractLine,
} from 'react-icons/ri';

export const EditionIcons = {
  rename: <RiInputField />,
  split: <RiScissorsCutLine />,
  delete: <RiDeleteBin5Line />,
  merge: <RiMergeCellsVertical />,
  toggleCartIn: <RiBookmarkLine />,
  toggleCartOut: <RiBookmarkFill />,
  removeFromCart: <RiSubtractLine />,
};
