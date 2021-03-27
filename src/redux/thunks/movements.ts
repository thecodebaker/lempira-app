import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
// @ts-ignore
import { BASE_URL } from '@env';
import { Action } from '../../Types/Action';
import { SET_MOVEMENTS } from '../actions';

export const getMovements = (token: string, callback?: Function) => {
  return (dispatch: ThunkDispatch<{}, {}, Action<any>>) => {
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
        console.error(err);
      });
  };
};
