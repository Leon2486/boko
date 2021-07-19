import React from "react";
import { connect } from "react-redux";

import { signIn, signOut } from "../../actions";
import NavbarUser from "../Navbar/NavbarUser";

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.authChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.authChange);
        });
    });
  }

  authChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else if (!isSignedIn) {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };
  onSignOutClick = () => {
    this.auth.signOut();
  };

  onButtonRender() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (!this.props.isSignedIn) {
      return (
        <div className="navbar__user-login">
          <button className="btn btn--primary" onClick={this.onSignInClick}>
            sign in with google
          </button>
        </div>
      );
    } else {
      return <NavbarUser onSignedOutClick={this.onSignOutClick} />;
    }
  }

  render() {
    return <div className="">{this.onButtonRender()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
