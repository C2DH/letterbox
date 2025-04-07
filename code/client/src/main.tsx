import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/index.scss';

import { Root } from './views/Root.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
