import React, { useEffect } from "react";
import { Router, Route } from "react-router-dom";
import history from "../history";
import { useSelector, useDispatch } from "react-redux";

import { fetchMyBook } from "../store/book-action-creator";
import { fetchCartData } from "../store/cart-action-creator";

import Navbar from "./Navbar/Navbar";
import Home from "./pages/Home";
import ShowSearch from "./pages/ShowSearch";
import ShowGenre from "./pages/ShowGenre";
import ShowItem from "./pages/ShowItem";
import CheckOut from "./pages/CheckOut";
import Mybook from "./pages/Mybook";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./footer/Footer";
import Modal from "./main/Modal";

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
          <Route path="/error" exact component={ErrorPage} />
        </main>
        <Modal />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
