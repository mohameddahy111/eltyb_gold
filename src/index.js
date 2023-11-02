import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DataStoreProvider } from './context/dataStore';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SnackbarProvider anchorOrigin={{vertical :'top' , horizontal :'center'}}>
    <DataStoreProvider>
    <App />

    </DataStoreProvider>

    </SnackbarProvider>
  </React.StrictMode>
);

