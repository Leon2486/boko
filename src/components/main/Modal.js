import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";
import { closeModal } from "../../actions";

function Modal({ modal, closeModal, cart }) {
  useEffect(() => {
    const modalControl = setTimeout(() => {
      if (modal.open) {
        closeModal();
      }
    }, 3000);
    return () => {
      clearTimeout(modalControl);
    };
  }, [cart]);

  const renderModal = () => {
    if (modal.open) return <div className="modal">{modal.message}</div>;
  };

  return ReactDOM.createPortal(renderModal(), document.querySelector("#modal"));
}

const mapStateToProps = (state) => {
  return { modal: state.modal, cart: state.cart.cartItem };
};

export default connect(mapStateToProps, { closeModal })(Modal);
