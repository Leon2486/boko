const INITIAL = { open: false, message: null };

const modalReducer = (state = INITIAL, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, open: true, message: action.payload };
    case "CLOSE_MODAL":
      return { ...state, open: false, message: null };
    default:
      return state;
  }
};

export default modalReducer;
