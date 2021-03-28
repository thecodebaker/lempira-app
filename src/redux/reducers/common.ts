import { Action } from '../../Types/Action';
const initialState = {
  signs: {
    HNL: 'L',
    USD: '$',
    EUR: '€',
  },
};
const commonReducer = (state = initialState, action: Action<any>) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default commonReducer;
