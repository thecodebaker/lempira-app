import { Action } from '../../Types/Action';
import User from '../../Types/User';
import { SET_USER } from '../actions';

const authReducer = (
  state = {
    user: {
      token: undefined,
      name: undefined,
    },
  },
  action: Action<User>
) => {
  switch (action.type) {
    case SET_USER: {
      const { token, name } = action.payload;
      return { ...state, user: { token, name } };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
