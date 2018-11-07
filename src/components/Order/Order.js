import React from 'react';

import styles from './Order.module.css';

const order = (props) => {
  const ingredients = [];
  for (let k in props.ingredients) {
    ingredients.push(k + ' (' + props.ingredients[k] + ')')
  }

  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredients.join(', ')}</p>
      <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)} USD</strong></p>
    </div>
  );
}

export default order;
