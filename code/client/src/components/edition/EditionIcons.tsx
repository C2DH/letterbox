import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import {
  RiDeleteBin5Line,
  RiInputField,
  RiMergeCellsVertical,
  RiScissorsCutLine,
} from 'react-icons/ri';

export const EditionIcons = {
  rename: <RiInputField />,
  split: <RiScissorsCutLine />,
  delete: <RiDeleteBin5Line />,
  merge: <RiMergeCellsVertical />,
  addToCart: <FaRegBookmark />,
  removeFromCart: <FaBookmark />,
};
