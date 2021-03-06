const initialState = {
  meetups: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_MEETUPS": {
      return { ...state, meetups: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
