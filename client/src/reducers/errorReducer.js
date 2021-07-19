export default (state = null, action) => {
  switch (action.type) {
    case "ERROR":
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
