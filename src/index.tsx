import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { App } from './app/app';
import { AppProvider } from './app/providers/app-provider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HashRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </HashRouter>
);
