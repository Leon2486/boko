import React, { useEffect } from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import { useSelector, useDispatch } from "react-redux";

import { fetchMyBook } from "./store/book-action-creator";
import { fetchCartData } from "./store/cart-action-creator";

import Navbar from "./Navigation/MainNavigation";
import Home from "./Books/pages/Home";
import ShowGenre from "./Books/pages/ShowGenreBooks";
import ShowSearch from "./Books/pages/ShowSearchBooks";
import ShowItem from "./Books/pages/ShowSingleBook";

import CheckOut from "./purchase/pages/CheckOut";
import Mybook from "./Users/pages/Mybook";
//import ErrorPage from "./components/pages/ErrorPage";
import Footer from "./footer/Footer";
import Modal from "./shared/UI/Modal";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth);
  const { isSignedIn } = currentUser;

  useEffect(() => {
    if (isSignedIn) {
      dispatch(fetchCartData());
      dispatch(fetchMyBook());
    }
  }, [currentUser, dispatch, isSignedIn]);

  return (
    <div>
      <Router history={history}>
        <Navbar />
        <main>
          <Route path="/" exact component={Home} />
          <Route path="/search" exact component={ShowSearch} />
          <Route path="/genre/:id" exact component={ShowGenre} />
          <Route path="/show/:id" exact component={ShowItem} />
          <Route path="/checkout" exact component={CheckOut} />
          <Route path="/mybook" exact component={Mybook} />
          {/* <Route path="/error" exact component={ErrorPage} /> */}
        </main>
        <Modal />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
