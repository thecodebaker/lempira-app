import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
// @ts-ignore
import { BASE_URL } from '@env';
import { SET_LAST_EXCHANGE, SET_EXCHANGES } from '../actions';
import store from '../store';
import moment from 'moment';
import { Action } from '../../Types/Action';

export const getExchanges = (token: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, Action<any>>) => {
    if (
      store.getState().common.lastUpdate === undefined ||
      moment().diff(store.getState().common.lastUpdate, 'days') > 0
    ) {
      dispatch({
        type: SET_LAST_EXCHANGE,
        payload: moment(),
      });
      axios
        .get(`${BASE_URL}/movements/exchanges`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((resp) => {
          dispatch({ type: SET_EXCHANGES, payload: resp.data.exchanges });
        });
    } else {
      console.log('se tiene aun');
    }
  };
};
