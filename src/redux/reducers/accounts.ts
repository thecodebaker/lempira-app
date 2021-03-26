import { Action } from '../../Types/Action';
import { SET_ACCOUNTS } from '../actions';

const accountsReducer = (
  state = {
    accounts: [],
  },
  action: Action<any>
) => {
  switch (action.type) {
    case SET_ACCOUNTS: {
      const { accounts } = action.payload;
      return { ...state, accounts: [...accounts] };
    }
    default: {
      return state;
    }
  }
};

export default accountsReducer;
