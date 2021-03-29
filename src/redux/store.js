import { createStore, combineReducers, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './reducers/auth';
import accountsReducer from './reducers/accounts';
import movementsReducer from './reducers/movements';
import commonReducer from './reducers/common';

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
