import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from './store/AuthContext';
import { store } from "./store/store";
import { Provider } from 'react-redux';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <AuthContextProvider>
    <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>
  </AuthContextProvider>
);
