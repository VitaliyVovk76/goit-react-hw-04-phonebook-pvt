import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener("keydown", eskKeyDown);
    return window.removeEventListener("keydown", eskKeyDown);
  }, []);

  const modalClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  const eskKeyDown = (evt) => {
    if (evt.code === "Escape") {
      this.props.onClose();
    }
  };

  return createPortal(
    <div className={s.backdrop} onClick={modalClick}>
      <div className={s.content}>
        <button className={s.btnClose} type="button" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = { children: PropTypes.node };

export default Modal;
