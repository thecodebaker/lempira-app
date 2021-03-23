import { createStore, combineReducers, applyMiddleware } from "redux";
import { AsyncStorage } from "react-native";
import ReduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from "./reducers/auth";
import accountsReducer from "./reducers/accounts";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const reducer = combineReducers({
  authReducer,
  accountsReducer,
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
