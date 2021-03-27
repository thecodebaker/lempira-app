import { Action } from '../../Types/Action';
import { SET_MOVEMENTS } from '../actions';

const movementsReducer = (
  state = {
    movements: [],
  },
  action: Action<any>
) => {
  switch (action.type) {
    case SET_MOVEMENTS: {
      const { movements } = action.payload;
      return { ...state, movements: [...movements] };
    }
    default: {
      return state;
    }
  }
};

export default movementsReducer;
