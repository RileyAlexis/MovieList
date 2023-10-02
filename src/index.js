import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.js';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
//Redux Store Module
import storeInstance from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
            <App />
            {/* </PersistGate> */}
        </Provider>
    </React.StrictMode>
);
