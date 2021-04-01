// @ts-ignore
import { BASE_URL } from '@env';
import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';

import { Action } from '../../Types/Action';
import User from '../../Types/User';
import { SET_ACCOUNTS, SET_MOVEMENTS, SET_USER } from '../actions';

export const LOGIN = (email: string, password: string) => {
  return (dispatch: ThunkDispatch<object, object, Action<User>>) => {
    return axios
      .post(`${BASE_URL}/auth/login`, { email, password })
      .then((resp) => {
        dispatch({
          type: SET_USER,
          payload: { token: resp.data.token, name: resp.data.name },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const SIGNUP = (email: string, password: string, name: string) => {
  return (dispatch: ThunkDispatch<object, object, Action<User>>) => {
    return axios
      .post(`${BASE_URL}/auth/signup`, { email, password, name })
      .then((resp) => {
        dispatch(LOGIN(email, password));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const SIGNOUT = () => {
  return (dispatch: ThunkDispatch<object, object, Action<any>>) => {
    dispatch({
      type: SET_ACCOUNTS,
      payload: {
        accounts: [],
      },
    });
    dispatch({
      type: SET_MOVEMENTS,
      payload: {
        movements: [],
      },
    });
    dispatch({
      type: SET_USER,
      payload: { token: undefined, name: undefined },
    });
  };
};
