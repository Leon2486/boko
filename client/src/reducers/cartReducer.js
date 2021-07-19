import _ from "lodash";

export default (state = { showCart: false, cartItem: {} }, action) => {
  switch (action.type) {
    case "OPEN_CART":
      return (state = { ...state, showCart: !state.showCart });
    case "CLOSE_CART":
      return (state = { ...state, showCart: false });
    case "ADD_CART":
      return (state = {
        ...state,
        cartItem: {
          ...state.cartItem,
          [action.payload.itemNumber]: action.payload,
        },
      });
    case "REMOVE_CART":
      return (state = {
        ...state,
        cartItem: _.omit(state.cartItem, action.payload),
      });
    case "INIT_CART":
      return (state = {
        ...state,
        cartItem: action.payload,
      });
    case "EMPTY_CART":
      return (state = {
        ...state,
        cartItem: {},
      });
    default:
      return state;
  }
};
