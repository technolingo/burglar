import React from 'react';

import styles from './OrderSummary.module.css';
import Button from '../../UI/Button/Button';


const orderSummary = (props) => {
  const ingredientListItems = Object.keys(props.ingredients).map(
    igKey => {
      const igSubTotal = props.ingredients[igKey] * props.ingredientPrices[igKey];
      return (
        <li key={igKey}>
          <span className={styles.capitalize}>{igKey}</span>
           x {props.ingredients[igKey]} = ${igSubTotal.toFixed(2)}
         </li>
      );
    }
  );



  return (
    <>
      <p className={styles.rightAlign}><button onClick={props.close}>X</button></p>
      <h3 className={styles.centerAlign}>Your Order:</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        <li><span className={styles.capitalize}>Base Price</span>: ${props.basePrice.toFixed(2)}</li>
        {ingredientListItems}
      </ul>
      <p>Total price: ${props.totalPrice.toFixed(2)}</p>
      <p className={styles.centerAlign}>
        <Button btnType="Success" clicked={props.checkout}>Proceed to Order</Button>
      </p>
    </>
  );
}


export default orderSummary;
