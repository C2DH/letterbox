import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './pages/Root';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
