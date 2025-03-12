import { FC } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

export const Error404: FC<{ message?: string }> = ({ message }) => {
  return (
    <div className={'container text-center col-6 mt-5 pt-5'}>
      <div className="row">
        <h1>
          <FaExclamationTriangle className="text-warning" />
        </h1>
        <h2 className="fw-bold">404</h2>
        <p>{message || "The page you are looking for can't be found."}</p>
      </div>
    </div>
  );
};
