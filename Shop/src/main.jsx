import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Theme } from './theme.jsx';
import { Provider } from 'react-redux'
import Store from './store.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<>
  <Provider store={Store}>
    <Theme>
      <PayPalScriptProvider deferLoading={true}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
      </PayPalScriptProvider>
    </Theme>
  </Provider>
  <ToastContainer/>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

