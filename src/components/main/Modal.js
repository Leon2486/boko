import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import CSSTransition from "react-transition-group/CSSTransition";

import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/modalSlice";

function Modal() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  useEffect(() => {
    const modalControl = setTimeout(() => {
      if (modal.show) {
        dispatch(modalActions.closeModal());
      }
    }, 4000);
    return () => {
      clearTimeout(modalControl);
    };
  }, [modal, dispatch]);

  const renderModal = () => {
    return (
      <CSSTransition
        unmountOnExit
        mountOnEnter
        in={modal.show}
        timeout={1000}
        classNames={{ enterActive: "modalOpen", exitActive: "modalClose" }}
      >
        <div className="modal">{modal.message}</div>
      </CSSTransition>
    );
  };

  return ReactDOM.createPortal(renderModal(), document.querySelector("#modal"));
}

export default Modal;
