import React from 'react';

import styles from './Control.module.css';

const control = (props) => (
  <div className={styles.Control}>
    <div className={styles.Label}>{props.label}</div>
    <button
      className={styles.Less}
      onClick={props.removed.bind(this, props.type)}
      disabled={props.removeDisabled}
    >LESS</button>
    <button className={styles.More} onClick={props.added}>MORE</button>
  </div>
);


export default control;
