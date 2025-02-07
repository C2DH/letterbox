import { ModalProvider } from '@ouestware/modals';
import { NotificationProvider } from '@ouestware/notifications';
import { FC, useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';

import { getRouter } from '../core/router';

const Root: FC = () => {
  const router = useMemo(() => getRouter(), []);

  return (
    <NotificationProvider>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </NotificationProvider>
  );
};

export default Root;
