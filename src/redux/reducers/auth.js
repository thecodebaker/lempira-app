const accountsReducer = (
  state = {
    user: {
      token: undefined,
      name: undefined,
    },
  },
  action
) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default accountsReducer;
