import React, { Component } from 'react';

import PropTypes from 'prop-types';

import styles from './Ingredient.module.css';


class Ingredient extends Component {
  render () {
    let ingred = null;

    switch (this.props.type) {
      case 'breadTop':
        ingred = (
          <div className={styles.BreadTop}>
            <div className={styles.Seeds1}></div>
            <div className={styles.Seeds2}></div>
          </div>
        );
        break;
      case 'breadBottom':
        ingred = <div className={styles.BreadBottom}></div>;
        break;
      case 'meat':
        ingred = <div className={styles.Meat}></div>;
        break;
      case 'cheese':
        ingred = <div className={styles.Cheese}></div>;
        break;
      case 'salad':
        ingred = <div className={styles.Salad}></div>;
        break;
      case 'bacon':
        ingred = <div className={styles.Bacon}></div>;
        break;
      default:
        ingred = null;
    } // switch

    return ingred;
  } // render
}


// property validation
Ingredient.propTypes = {
  type: PropTypes.string.isRequired
};


export default Ingredient;
