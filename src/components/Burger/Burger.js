import React from 'react';

import Ingredient from './Ingredient/Ingredient';
import styles from './Burger.module.css';


const burger = (props) => {
  // index & key pairs, no values
  let ingredientArray = Object.keys(props.ingredients).map(
    // create corresponding number of undefined elements per ingredient
    igKey => ([...Array(props.ingredients[igKey])]).map(
      // create the correct number of ingredient components
      (_, i) => (<Ingredient key={igKey + i} type={igKey} />)
      // check if any ingredients present by flatenning the array of empty arrays
    )
  ).reduce((rt_arr, el_arr) => (rt_arr.concat(el_arr)), []);

  if (ingredientArray.length === 0) {
    ingredientArray = <p>Please add some ingredients</p>;
  }

  return (
    <div className={styles.Burger}>
      <Ingredient type='breadTop' />
      {ingredientArray}
      <Ingredient type='breadBottom' />
    </div>
  );
}

export default burger;
