import axios from 'axios';
// @ts-ignore
import { BASE_URL } from '@env';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from '../Types/Action';

import User from '../Types/User';
import Account from '../Types/Account';

export const SET_USER = 'SET_USER';
export const SET_ACCOUNTS = 'SET_ACCOUNTS';

export const LOGIN = (email: string, password: string) => {
  return (dispatch: ThunkDispatch<{}, {}, Action<User>>) => {
    return axios
      .post(`${BASE_URL}/auth/login`, { email, password })
      .then((resp) => {
        dispatch({
          type: SET_USER,
          payload: { token: resp.data.token, name: resp.data.name },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const SIGNUP = (email: string, password: string, name: string) => {
  return (dispatch: ThunkDispatch<{}, {}, Action<User>>) => {
    return axios
      .post(`${BASE_URL}/auth/signup`, { email, password, name })
      .then((resp) => {
        dispatch({
          type: SET_USER,
          payload: { token: resp.data.token, name: resp.data.name },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const getAccounts = (token: string) => {
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
          type: 'SET_ACCOUNTS',
          payload: {
            accounts,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
