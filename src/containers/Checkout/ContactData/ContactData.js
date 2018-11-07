import React, { Component } from 'react';
import axios from '../../../axios-orders';

import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      city: '',
      zipCode: '',
      country: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: this.state.name,
        address: this.state.address,
        email: this.state.email
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(r => {
        console.log(r);
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(e => {
        console.log(e);
        this.setState({loading: false});
      });
  }

  render () {
    let billingData = (
      <>
        <h4>Enter Your Contact Data</h4>
        <form>
          <input className={styles.Input} type='text' name='name' placeholder='Full Name' />
          <input className={styles.Input} type='text' name='email' placeholder='Email Address' />
          <input className={styles.Input} type='text' name='street' placeholder='Street Address' />
          <input className={styles.Input} type='text' name='city' placeholder='City' />
          <input className={styles.Input} type='text' name='postal' placeholder='Postal Code' />
          <input className={styles.Input} type='text' name='country' placeholder='Country' />
          <Button btnType='Success' clicked={this.orderHandler}>Place Order</Button>
        </form>
      </>
    );

    if (this.state.loading) {
      billingData = <Spinner />;
    }
    return (
      <div className={styles.ContactData}>
        {billingData}
      </div>
    );
  }
}

export default ContactData;
