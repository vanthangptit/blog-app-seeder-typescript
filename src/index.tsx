import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ** Redux Imports
import { store } from '@store/configureStore';
import { Provider } from 'react-redux';

// ** Styles common
import '@styles/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
