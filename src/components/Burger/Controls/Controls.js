import React from 'react';

import Control from './Control/Control';
import styles from './Controls.module.css';


const buildControls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
];

const controls = (props) => (
  <div className={styles.Controls}>
    <p>Price: $<strong>{props.totalPrice.toFixed(2)}</strong></p>
    {buildControls.map(c => (<Control
      key={c.label}
      label={c.label}
      type={c.type}
      // 2 ways of passing the type parameter
      //removed={props.ingredRemoved.bind(this, c.type)}
      removed={() => props.ingredRemoved(c.type)}
      added={() => props.ingredAdded(c.type)}
      removeDisabled={props.disabledInfo[c.type]}
    />))}
    <button
      className={styles.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered.bind(this)}
    >{props.isAuth ? 'ORDER NOW' : 'LOG IN TO CONTINUE'}</button>
  </div>
);


export default controls;
