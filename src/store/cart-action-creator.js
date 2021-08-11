import firebase from "../components/firebase";
import { cartActions } from "./cartSlice";
import { errorActions } from "./errorSlice";

export const addItemToCart = (item) => {
  return async (dispatch, getState) => {
    try {
      dispatch(cartActions.addCart(item));

      const { userId } = getState().auth;
      const { cartItem } = getState().cart;

      const userRef = await firebase
        .firestore()
        .collection("users")
        .doc(userId);

      const snapshot = await userRef.get();

      if (snapshot.exists) {
        userRef.update({
          cart: cartItem,
        });
      }
      if (!snapshot.exists) {
        userRef.set({ cart: cartItem }, { merge: true });
      }
    } catch (e) {
      dispatch(errorActions.foundError("can't add items to cart"));
      console.log(e);
    }
  };
};

export const removeItemFromCart = (itemNumber) => {
  return async (dispatch, getState) => {
    try {
      dispatch(cartActions.removeCart(itemNumber));

      const { userId } = getState().auth;
      const { cartItem } = getState().cart;

      await firebase.firestore().collection("users").doc(userId).update({
        cart: cartItem,
      });
    } catch (e) {
      dispatch(errorActions.foundError("can't remove item from cart"));
      console.log(e);
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch, getState) => {
    try {
      const { userId } = getState().auth;
      const doc = await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .get();

      if (doc.data() && doc.data().cart) {
        const { cart } = doc.data();

        dispatch(cartActions.fetchCart(cart));
      }
    } catch (e) {
      dispatch(errorActions.foundError("can't fetch your cart data"));
      console.log(e);
    }
  };
};
