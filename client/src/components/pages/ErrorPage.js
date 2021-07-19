import React from "react";
import { connect } from "react-redux";

function ErrorPage({ message }) {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2 className="heading2 mb-sm">{message}</h2>
      <p className="text mb-lg" style={{ lineHeight: "1.5" }}>
        try to refresh the page or contact the custom service
        <br />
        email:a5882352941176470@gmail.com
        <br />
        phone:128463827482 (of course not the real one)
      </p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { message: state.error.message };
};

export default connect(mapStateToProps)(ErrorPage);
