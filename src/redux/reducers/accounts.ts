import { Action } from '../../Types/Action';
import { SET_ACCOUNTS } from '../actions';
import Account from '../../Types/Account';
const initialState = {
  accounts: [],
};
const accountsReducer = (state = initialState, action: Action<any>) => {
  switch (action.type) {
    case SET_ACCOUNTS: {
      const { accounts } = action.payload;
      const mapped = accounts.map((acc: Account) => ({
        ...acc,
        movement: {
          ...acc.movement,
          current:
            acc.movement.accountPrev +
            acc.movement.amount * (acc.movement.isIncome ? 1 : -1),
        },
      }));
      return { ...state, accounts: [...mapped] };
    }
    default: {
      return state;
    }
  }
};

export default accountsReducer;
