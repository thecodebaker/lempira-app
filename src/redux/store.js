import { AsyncStorage } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import ReduxThunk from 'redux-thunk';

import accountsReducer from './reducers/accounts';
import authReducer from './reducers/auth';
import commonReducer from './reducers/common';
import movementsReducer from './reducers/movements';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['accounts', 'movements'],
};
const reducer = combineReducers({
  auth: authReducer,
  accounts: accountsReducer,
  movements: movementsReducer,
  common: persistReducer(
    {
      key: 'common',
      storage: AsyncStorage,
      blacklist: ['signs'],
    },
    commonReducer
  ),
});
const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
const persistor = persistStore(store);

const getPersistor = () => persistor;
const getStore = () => store;
const getState = () => {
  return store.getState();
};
export { getStore, getState, getPersistor };

export default {
  getStore,
  getState,
  getPersistor,
};
