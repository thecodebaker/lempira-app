// @ts-ignore
import { BASE_URL } from '@env';
import axios from 'axios';
import moment from 'moment';
import { ThunkDispatch } from 'redux-thunk';

import { Action } from '../../Types/Action';
import { SET_LAST_EXCHANGE, SET_EXCHANGES, SET_CATEGORIES } from '../actions';
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
          const { exchanges } = resp.data;
          dispatch({
            type: SET_LAST_EXCHANGE,
            payload: moment(),
          });
          dispatch({ type: SET_EXCHANGES, payload: exchanges });
        });
    } else {
      console.log('Aun se tiene los exchange viejos');
    }
  };
};

export const getCategories = (token: string) => {
  return async (dispatch: ThunkDispatch<object, object, Action<any>>) => {
    return axios
      .get(`${BASE_URL}/categories/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        const { categories } = resp.data;
        dispatch({
          type: SET_CATEGORIES,
          payload: [...categories],
        });
      });
  };
};

export const addCategory = (
  token: string,
  name: string,
  callback: Function
) => {
  return async (dispatch: ThunkDispatch<object, object, Action<any>>) => {
    return axios
      .post(
        `${BASE_URL}/categories/`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        dispatch(getCategories(token));
        callback();
      })
      .catch((resp) => console.log('Error:', resp));
  };
};

export const removeCategory = (token: string, categoryId: string) => {
  return async (dispatch: ThunkDispatch<object, object, Action<any>>) => {
    return axios
      .delete(`${BASE_URL}/categories/`, {
        data: {
          categoryId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(getCategories(token));
      })
      .catch((resp) => console.log('Error:', resp));
  };
};
