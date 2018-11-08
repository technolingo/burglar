import React from 'react';

import styles from './Button.module.css';


const button = (props) => (
  <button
    onClick={props.clicked}
    type={props.btnType}
    className={[styles.Button, styles[props.btnClass]].join(' ')}
    >{props.children}</button>
);


export default button;
