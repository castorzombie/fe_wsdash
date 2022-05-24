import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AppRouter from './router/AppRouter'
import reportWebVitals from './reportWebVitals';


const container = document.getElementById('root');

const root = createRoot(container);

root.render(
 //<React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
//</React.StrictMode>
);

reportWebVitals();
