import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
// @ts-ignore
import { BASE_URL } from '@env';
import { Action } from '../../Types/Action';
import { SET_ACCOUNTS, SET_MOVEMENTS, SET_USER } from '../actions';
import User from '../../Types/User';

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

export const SIGNOUT = () => {
  return (dispatch: ThunkDispatch<{}, {}, Action<any>>) => {
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
