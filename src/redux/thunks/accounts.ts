import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
// @ts-ignore
import { BASE_URL } from '@env';
import { SET_ACCOUNTS } from '../actions';
import { Action } from '../../Types/Action';

export const getAccounts = (token: string, callback?: Function) => {
  return (dispatch: ThunkDispatch<{}, {}, Action<any>>) => {
    return axios
      .get(`${BASE_URL}/accounts/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        const { accounts } = resp.data;
        dispatch({
          type: SET_ACCOUNTS,
          payload: {
            accounts,
          },
        });
        callback && callback(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const createAccount = (
  token: string,
  name: string,
  currency: string,
  balance: number,
  hasMinimum: boolean,
  minimum: number | undefined
) => {
  return (dispatch: ThunkDispatch<{}, {}, Action<any>>) => {
    return axios
      .post(
        `${BASE_URL}/accounts/`,
        { name, currency, balance, hasMinimum, minimum },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((resp) => {
        dispatch(getAccounts(token));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const deleteAccount = (token: string, accountId: string) => {
  return (dispatch: ThunkDispatch<{}, {}, Action<any>>) => {
    return axios
      .delete(`${BASE_URL}/accounts/`, {
        data: {
          accountId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        dispatch(getAccounts(token));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
