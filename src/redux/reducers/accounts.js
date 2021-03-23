const authReducer = (
  state = {
    accounts: [],
  },
  action
) => {
  switch (action.type) {
    case "SET_USER": {
      const { user } = action.payload;
      return { ...state, user };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
