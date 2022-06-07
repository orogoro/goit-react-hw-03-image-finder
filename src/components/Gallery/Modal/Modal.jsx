import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClick();
    }
  };
  handleBackdrope = e => {
    if (e.currentTarget === e.target) {
      this.props.onClick();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return createPortal(
      <div className={styles.Overlay} onClick={this.handleBackdrope}>
        <div className={styles.Modal}> {this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
