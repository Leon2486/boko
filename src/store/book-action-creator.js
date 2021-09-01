import kobo from "../apis/koboApi";
import firebase from "../firebase";
import history from "../history";
import { bookActions } from "./bookSlice";
import { errorActions } from "./errorSlice";

export const fetchMyBook = () => async (dispatch, getState) => {
  try {
    const { userId } = getState().auth;
    const mybook = await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get();

    if (mybook.data() && mybook.data().book) {
      const { book } = mybook.data();

      dispatch(bookActions.fetchMyBook(book));
    }
  } catch (e) {
    // history.push("/error");
    dispatch(errorActions.foundError("can't fetch your book"));
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

    dispatch(bookActions.purchaseBook(books));
  } catch (e) {
    console.log(e);
    dispatch(errorActions.foundError("purchase failed"));
    // history.push("/error");
  }
};

export const fetchGenre = (koboGenreId) => async (dispatch) => {
  try {
    const res = await kobo.get("/GenreSearch/20131010", {
      params: {
        koboGenreId,
      },
    });

    dispatch(bookActions.fetchGenre(res.data.children));
  } catch (e) {
    console.log(e);
    dispatch(errorActions.foundError("can't fetch book genre"));
    // history.push("/error");
  }
};

export const fetchEBooks = (koboGenreId) => async (dispatch) => {
  try {
    dispatch(bookActions.loadingStart());
    const res = await kobo.get("/EbookSearch/20170426", {
      params: {
        koboGenreId,
        hits: 18,
      },
    });

    const itemList = res.data.Items.map(({ Item }) => {
      return Item;
    });
    dispatch(bookActions.fetchEbooks(itemList));
    dispatch(bookActions.loadingEnd());
  } catch (e) {
    console.log(e);
    dispatch(errorActions.foundError("can't fetch books"));
    // history.push("/error");
  }
};

export const fetchEBook = (itemNumber) => async (dispatch) => {
  try {
    dispatch(bookActions.loadingStart());
    const res = await kobo.get("/EbookSearch/20170426", {
      params: {
        itemNumber,
      },
    });

    dispatch(bookActions.fetchEbook(res.data.Items[0].Item));
    dispatch(bookActions.loadingEnd());
  } catch (e) {
    console.log(e);
    dispatch(errorActions.foundError("can't fetch book"));
    // history.push("/error");
  }
};

export const fetchSearch = (title) => async (dispatch) => {
  try {
    dispatch(bookActions.loadingStart());
    const res = await kobo.get("EbookSearch/20170426", {
      params: {
        title,
      },
    });

    const itemList = res.data.Items.map(({ Item }) => {
      return Item;
    });
    dispatch(bookActions.fetchSearch(itemList));
    dispatch(bookActions.loadingEnd());
  } catch (e) {
    // history.push("/error");
    dispatch(errorActions.foundError("can't search books"));
    console.log(e);
  }
};
