import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';

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
    orderForm: {
        name: {
          elementType: 'input',
          elementAttributes: {
            type: 'text',
            placeholder: 'Full Name',
          },
          value: '',
          validation: {
            required: true,
            minLength: 4
          },
          valid: false,
          touched: false
        },
        email: {
          elementType: 'input',
          elementAttributes: {
            type: 'email',
            placeholder: 'Email',
          },
          value: '',
          validation: {
            required: true,
            email: true
          },
          valid: false,
          touched: false
        },
        street: {
          elementType: 'input',
          elementAttributes: {
            type: 'text',
            placeholder: 'Street',
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        city: {
          elementType: 'input',
          elementAttributes: {
            type: 'text',
            placeholder: 'City',
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        zipCode: {
          elementType: 'input',
          elementAttributes: {
            type: 'text',
            placeholder: 'Postal Code',
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        country: {
          elementType: 'input',
          elementAttributes: {
            type: 'text',
            placeholder: 'Country',
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        deliveryMethod: {
          elementType: 'select',
          elementAttributes: {
            options: [
              {value: 'fast', displayValue: 'Fast'},
              {value: 'economic', displayValue: 'Economic'},
            ]
          },
          value: 'fast',
          valid: true,
          touched: false
        }
    },
    formIsValid: false
  }

  isFormFieldValid = (value, rules) => {
    let isValid = true;

    // skip elements that do not have validation rules
    if (rules) {
      if (rules.required) {
        isValid = value.trim() !== '' && isValid;
      }
      if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
      }
      if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
      }
      if (rules.email) {
        // this is obviously an oversimplified example
        isValid = value.includes('@') && isValid;
      }
    } // if rules

    return isValid;
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
    // start checking input validity
    updatedFormElement.touched = true;
    // custom form field validation
    updatedFormElement.valid = this.isFormFieldValid(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    // check form data's OVERALL validity
    let formIsValid = true;
    for (let field in updatedOrderForm) {
      // use && to make sure the form is valid only if all fields are valid
      formIsValid = updatedOrderForm[field].valid && formIsValid;
    }

    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let field in this.state.orderForm) {
      formData[field] = this.state.orderForm[field].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.total,
      orderData: formData
    }

    this.props.onOrderBurger(order);
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
                   invalid={!elem.config.valid}
                   shouldValidate={elem.config.validation && elem.config.touched}
            />
          ))}
          <Button btnClass='Success' btnType='submit' disabled={!this.state.formIsValid}>Place Order</Button>
        </form>
      </>
    );

    if (this.props.loading) {
      billingData = <Spinner />;
    }
    return (
      <div className={styles.ContactData}>
        {billingData}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  total: state.burgerBuilder.totalPrice,
  loading: state.order.loading
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
