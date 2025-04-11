import { FC, PropsWithChildren } from 'react';

export const Badge: FC<PropsWithChildren> = ({ children }) => (
  <span className="badge text-bg-light-gray fw-normal me-2 border">{children}</span>
);
