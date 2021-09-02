import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../store/authSlice";
import NavbarUser from "../Navigation/UserNavigation";

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleOAuth = (props) => {
  const authRef = useRef();
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: "email",
        })
        .then(() => {
          authRef.current = window.gapi.auth2.getAuthInstance();
          authChange(authRef.current.isSignedIn.get());
          authRef.current.isSignedIn.listen(authChange);
        });
    });
  }, []);

  const authChange = (isSignedIn) => {
    if (isSignedIn) {
      dispatch(authActions.signIn(authRef.current.currentUser.get().getId()));
    } else if (!isSignedIn) {
      dispatch(authActions.signOut());
    }
  };

  const onSignInClick = () => {
    authRef.current.signIn();
  };
  const onSignOutClick = () => {
    authRef.current.signOut();
  };

  const onButtonRender = () => {
    if (isSignedIn === null) {
      return null;
    } else if (!isSignedIn) {
      return (
        <div className="navbar__user-login">
          <button className="btn btn--primary" onClick={onSignInClick}>
            sign in with google
          </button>
        </div>
      );
    } else {
      return <NavbarUser onSignedOutClick={onSignOutClick} />;
    }
  };

  return <div className="">{onButtonRender()}</div>;
};

export default GoogleOAuth;
