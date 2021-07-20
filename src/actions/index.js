import kobo from "../apis/koboApi";
import firebase from "../components/firebase";
import history from "../history";

/////////////////loading

const loadingStart = () => {
  return {
    type: "LOADING_START",
  };
};

const loadingFinish = () => {
  return {
    type: "LOADING_FINISH",
  };
};

////////modal

export const openModal = (message) => {
  return {
    type: "OPEN_MODAL",
    payload: message,
  };
};

export const closeModal = (message) => {
  return {
    type: "CLOSE_MODAL",
    payload: message,
  };
};

///////////////////////////////////////////cart

export const toggleCart = () => {
  return {
    type: "OPEN_CART",
  };
};

export const closeCart = () => {
  return {
    type: "CLOSE_CART",
  };
};

export const addCart = (item) => {
  return {
    type: "ADD_CART",
    payload: item,
  };
};

export const removeCart = (itemNumber) => {
  return {
    type: "REMOVE_CART",
    payload: itemNumber,
  };
};

export const initCart = () => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const doc = await firebase.firestore().collection("users").doc(userId).get();

  if (doc.data().cart) {
    const { cart } = doc.data();

    dispatch({
      type: "INIT_CART",
      payload: cart,
    });
  }
};

export const emptyCart = () => {
  return {
    type: "EMPTY_CART",
  };
};

//////////////////////////////////////////auth

export const signIn = (userId) => async (dispatch) => {
  dispatch({
    type: "SIGN_IN",
    payload: userId,
  });
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

///////////////////////////////////////////MY book

export const fetchMyBook = () => async (dispatch, getState) => {
  try {
    const { userId } = getState().auth;
    const mybook = await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get();

    if (mybook.data().book) {
      const { book } = mybook.data();

      dispatch({
        type: "STORE_MYBOOK",
        payload: book,
      });
    }
  } catch (e) {
    dispatch({
      type: "ERROR",
      payload: "fail to fetch your book",
    });

    history.push("/error");

    console.log(e);
  }
};

export const bookPurchase = (books) => async (dispatch, getState) => {
  try {
    const { userId } = getState().auth;
    await firebase.firestore().collection("users").doc(userId).set(
      {
        book: books,
        cart: {},
      },
      { merge: true }
    );

    dispatch({
      type: "BOOK_PURCHASE",
      payload: books,
    });
  } catch (e) {
    console.log(e);

    dispatch({
      type: "ERROR",
      payload: "fail to purchase",
    });

    history.push("/error");
  }
};

//////////////////////////////////////////BOOK

export const fetchGenre = (koboGenreId) => async (dispatch) => {
  try {
    const res = await kobo.get("/GenreSearch/20131010", {
      params: {
        koboGenreId,
      },
    });

    dispatch({ type: "FETCH_GENRE", payload: res.data.children });
  } catch (e) {
    console.log(e);

    dispatch({
      type: "ERROR",
      payload: "can't fetch genres above",
    });

    history.push("/error");
  }
};

export const fetchEBooks = (koboGenreId) => async (dispatch) => {
  try {
    dispatch(loadingStart());

    const res = await kobo.get("/EbookSearch/20170426", {
      params: {
        koboGenreId,
        hits: 18,
      },
    });

    const itemList = res.data.Items.map(({ Item }) => {
      return Item;
    });

    dispatch({ type: "FETCH_EBOOKS", payload: itemList });

    dispatch(loadingFinish());
  } catch (e) {
    console.log(e);

    dispatch({
      type: "ERROR",
      payload: "can't find books in this genre",
    });

    history.push("/error");
  }
};

export const fetchEBook = (itemNumber) => async (dispatch) => {
  try {
    const res = await kobo.get("/EbookSearch/20170426", {
      params: {
        itemNumber,
      },
    });

    dispatch({ type: "FETCH_EBOOK", payload: res.data.Items[0].Item });
  } catch (e) {
    console.log(e);

    dispatch({
      type: "ERROR",
      payload: "can't find this book",
    });

    history.push("/error");
  }
};

export const fetchSearch = (title) => async (dispatch) => {
  try {
    dispatch(loadingStart());
    const res = await kobo.get("EbookSearch/20170426", {
      params: {
        title,
      },
    });

    const itemList = res.data.Items.map(({ Item }) => {
      return Item;
    });

    dispatch({ type: "FETCH_SEARCH", payload: itemList });
    dispatch(loadingFinish());
  } catch (e) {
    dispatch({
      type: "ERROR",
      payload: "couldn't find the search result",
    });

    history.push("/error");
    console.log(e);
  }
};
