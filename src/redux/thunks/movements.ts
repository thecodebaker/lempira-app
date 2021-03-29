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

export const createMovement = (
  token: string,
  accountId: string,
  amount: number,
  isIncome: boolean,
  note: string
) => {
  return async (dispatch: ThunkDispatch<{}, {}, Action<any>>) => {
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
        const { movements } = resp.data;
        dispatch(getMovements(token));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const deleteMovement = (token: string, movementId: string) => {
  return (dispatch: ThunkDispatch<{}, {}, Action<any>>) => {
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
        dispatch(getMovements(token));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
