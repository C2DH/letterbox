import { FC } from 'react';
import { BsXOctagonFill } from 'react-icons/bs';

import { getErrorData } from '../../utils/error';
import { Error404 } from './404';
import { Error500 } from './500';

export const Error: FC<{ error?: unknown }> = ({ error }) => {
  const data = getErrorData(error);

  if (data.code === 404) return <Error404 message={data.message} />;
  return <Error500 message={data.message} />;
};

export const ErrorInline: FC<{ message?: string }> = ({ message }) => (
  <div className="d-flex align-items-center justify-content-center">
    <BsXOctagonFill className="text-danger me-1" />{' '}
    <span className="text-center">{message || 'Sorry, an error occured'}</span>
  </div>
);
