import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from '../pages/Home';

export function getRouter() {
  return createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
  ]);
}
