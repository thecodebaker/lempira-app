// @ts-ignore
import { BASE_URL } from '@env';
import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';

import { Action } from '../../Types/Action';
import { SET_MOVEMENTS } from '../actions';
import { getAccounts } from './accounts';

export const getMovements = (token: string, callback?: Function) => {
  return (dispatch: ThunkDispatch<object, object, Action<any>>) => {
    return axios
      .get(`${BASE_URL}/movements/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        const { movements } = resp.data;
        dispatch({
          type: SET_MOVEMENTS,
          payload: {
            movements,
          },
        });
        callback && callback(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createMovement = (
  token: string,
  accountId: string,
  amount: number,
  isIncome: boolean,
  note: string,
  callback: Function
) => {
  return async (dispatch: ThunkDispatch<object, object, Action<any>>) => {
    return axios
      .post(
        `${BASE_URL}/movements/`,
        { accountId, amount, isIncome, note },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((resp) => {
        // const { movements } = resp.data;
        dispatch(getAccounts(token));
        dispatch(getMovements(token));
        callback();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteMovement = (token: string, movementId: string) => {
  return (dispatch: ThunkDispatch<object, object, Action<any>>) => {
    return axios
      .delete(`${BASE_URL}/movements/`, {
        data: {
          movementId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        dispatch(getAccounts(token));
        dispatch(getMovements(token));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
