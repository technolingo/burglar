import React, { Component } from 'react';
import axios from '../../../axios-orders';

import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
    loading: false,
    orderForm: {
        name: {
          elementType: 'input',
          elementAttributes: {
            type: 'text',
            placeholder: 'Full Name',
          },
          value: ''
        },
        email: {
          elementType: 'input',
          elementAttributes: {
            type: 'text',
            placeholder: 'Email',
          },
          value: ''
        },
        street: {
          elementType: 'input',
          elementAttributes: {
            type: 'text',
            placeholder: 'Street',
          },
          value: ''
        },
        city: {
          elementType: 'input',
          elementAttributes: {
            type: 'text',
            placeholder: 'City',
          },
          value: ''
        },
        zipCode: {
          elementType: 'input',
          elementAttributes: {
            type: 'text',
            placeholder: 'Postal Code',
          },
          value: ''
        },
        country: {
          elementType: 'input',
          elementAttributes: {
            type: 'text',
            placeholder: 'Country',
          },
          value: ''
        },
        deliveryMethod: {
          elementType: 'select',
          elementAttributes: {
            options: [
              {value: 'fast', displayValue: 'Fast'},
              {value: 'economic', displayValue: 'Economic'},
            ]
          },
          value: ''
        }
    }
  }

  // set up two-way binding to both display and extract input value
  formElementChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    // clone this nested object deeply instead of creating a pointer
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    // set the element value to user input value
    updatedFormElement.value = event.target.value;
    // update state
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({orderForm: updatedOrderForm});
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});

    const formData = {};
    for (let field in this.state.orderForm) {
      formData[field] = this.state.orderForm[field].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
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
    const formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }



    let billingData = (
      <>
        <h4>Enter Your Contact Data</h4>
        <form onSubmit={this.orderHandler}>
          {formElements.map(elem => (
            <Input key={elem.id}
                   elementType={elem.config.elementType}
                   elementAttributes={elem.config.elementAttributes}
                   value={elem.config.value}
                   changed={(event) => this.formElementChangedHandler(event, elem.id)}
            />
          ))}
          <Button btnClass='Success' btnType='submit'>Place Order</Button>
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
