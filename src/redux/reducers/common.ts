import { Action } from '../../Types/Action';
import { SET_LAST_EXCHANGE, SET_EXCHANGES, SET_CATEGORIES } from '../actions';

const initialState = {
  signs: {
    HNL: 'L',
    USD: '$',
    EUR: '€',
  },
  exchanges: {},
  categories: [],
  lastUpdate: undefined,
};
const commonReducer = (state = initialState, action: Action<any>) => {
  switch (action.type) {
    case SET_LAST_EXCHANGE: {
      return {
        ...state,
        lastUpdate: action.payload,
      };
    }
    case SET_EXCHANGES: {
      return {
        ...state,
        exchanges: {
          ...action.payload,
        },
      };
    }
    case SET_CATEGORIES: {
      return {
        ...state,
        categories: [...action.payload],
      };
    }
    default: {
      return state;
    }
  }
};

export default commonReducer;
