import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './styles/index.scss';
import { Root } from './views/Root';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
