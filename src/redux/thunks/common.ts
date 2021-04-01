// @ts-ignore
import { BASE_URL } from '@env';
import axios from 'axios';
import moment from 'moment';
import { ThunkDispatch } from 'redux-thunk';

import { Action } from '../../Types/Action';
import { SET_LAST_EXCHANGE, SET_EXCHANGES } from '../actions';
import store from '../store';
import 'moment/locale/es';
moment.locale('es');

export const getExchanges = (token: string) => {
  return async (dispatch: ThunkDispatch<object, object, Action<any>>) => {
    if (
      store.getState().common.lastUpdate === undefined ||
      moment().diff(store.getState().common.lastUpdate, 'day') > 0
    ) {
      axios
        .get(`${BASE_URL}/movements/exchanges`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((resp) => {
          dispatch({
            type: SET_LAST_EXCHANGE,
            payload: moment(),
          });
          dispatch({ type: SET_EXCHANGES, payload: resp.data.exchanges });
        });
    } else {
      console.log('Aun se tiene los exchange viejos');
    }
  };
};
