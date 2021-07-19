import _ from "lodash";

export default (state = { genre: [], mybooks: {}, list: [] }, action) => {
  switch (action.type) {
    case "FETCH_SEARCH":
      return { ...state, list: action.payload };
    case "FETCH_GENRE":
      return { ...state, genre: [...action.payload] };
    case "FETCH_EBOOK":
      return {
        ...state,
        list: { ...state.list, [action.payload.itemNumber]: action.payload },
      };
    case "FETCH_EBOOKS":
      return { ...state, list: { ..._.mapKeys(action.payload, "itemNumber") } };
    case "STORE_MYBOOK":
      return { ...state, mybooks: action.payload };
    case "BOOK_PURCHASE":
      return {
        ...state,
        mybooks: { ...state.mybooks, ...action.payload },
      };
    default:
      return state;
  }
};
