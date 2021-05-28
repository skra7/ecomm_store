import React from "react";
import ReactDOM from "react-dom";
import thunk from 'redux-thunk'
import CategoryReducer from './store/reducers/CategoryReducer';
import CartReducer from './store/reducers/CartReducer';
import AddressReducer from './store/reducers/AddressReducer';
import CheckoutReducer from './store/reducers/CheckoutReducer';
import AuthReducer from './store/reducers/AuthReducer';
import OrderReducer from './store/reducers/OrderReducer'
import { Provider } from 'react-redux'
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import "./index.css";
import Backdrop from './UI/commons/BackDrop'
import storageSession from 'redux-persist/lib/storage/session'
import { PersistGate } from 'redux-persist/integration/react'
import App from "./App";
import * as serviceWorker from "./serviceWorker";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const RootReducers = combineReducers({
  category: CategoryReducer,
  cart: CartReducer,
  address: AddressReducer,
  checkout: CheckoutReducer,
  auth: AuthReducer,
  order:OrderReducer,

});

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['category', 'address', 'cart', 'address']
}
const pReducer = persistReducer(persistConfig, RootReducers)
const store = createStore(
  pReducer,
  composeEnhancers(applyMiddleware(thunk))
);
const persistor = persistStore(store);
export { persistor, store }
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Backdrop open={true} />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
