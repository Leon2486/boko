import React, { useEffect } from "react";
import { Router, Route } from "react-router-dom";
import history from "../history";
import { connect } from "react-redux";

import { initCart, fetchMyBook } from "../actions";

import Navbar from "./Navbar/Navbar";
import Home from "./pages/Home";
import ShowSearch from "./pages/ShowSearch";
import ShowGenre from "./pages/ShowGenre";
import ShowItem from "./pages/ShowItem";
import CheckOut from "./pages/CheckOut";
import Mybook from "./pages/Mybook";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./footer/Footer";

function App({ currentUser, initCart, fetchMyBook }) {
  const { isSignedIn } = currentUser;

  useEffect(() => {
    if (isSignedIn) {
      initCart();
      fetchMyBook();
    }
  }, [currentUser]);

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
        <Footer />
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { currentUser: state.auth };
};

export default connect(mapStateToProps, { initCart, fetchMyBook })(App);
