import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.eskKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.eskKeyDown);
  }

  modalClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.props.onClose();
    }
  };

  eskKeyDown = (evt) => {
    if (evt.code === "Escape") {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.backdrop} onClick={this.modalClick}>
        <div className={s.content}>
          <button
            className={s.btnClose}
            type="button"
            onClick={this.props.onClose}
          >
            Close
          </button>
          {this.props.children}
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = { children: PropTypes.node };

export default Modal;
