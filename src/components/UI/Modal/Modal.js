import React, { Component } from 'react';

import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component {

  shouldComponentUpdate = (nextProps, nextState) => {
    // only re-render this (& its children) when necessary
    return nextProps.display !== this.props.display;
  }

  render () {
    return (
      <>
        <Backdrop display={this.props.display} clicked={this.props.close} />
        <div
          className={styles.Modal}
          style={{
                  transform: this.props.display ? 'translateY(0)' : 'translateY(-100vh)',
                  opacity: this.props.display ? '1' : '0'
                }}
          >
          {this.props.children}
        </div>
      </>
    );
  }
}


export default Modal;
