import React, { Component } from 'react';

import styles from './Auth.module.css'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class Auth extends Component {
  state = {
    loginFields: {
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
      password: {
        elementType: 'input',
        elementAttributes: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 8
        },
        valid: false,
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
    const updatedLoginForm = {
      ...this.state.loginFields
    };
    // clone this nested object deeply instead of creating a pointer
    const updatedFormElement = {
      ...updatedLoginForm[inputIdentifier]
    };
    // set the element value to user input value
    updatedFormElement.value = event.target.value;
    // start checking input validity
    updatedFormElement.touched = true;
    // custom form field validation
    updatedFormElement.valid = this.isFormFieldValid(updatedFormElement.value, updatedFormElement.validation);
    updatedLoginForm[inputIdentifier] = updatedFormElement;

    // check form data's OVERALL validity
    let formIsValid = true;
    for (let field in updatedLoginForm) {
      // use && to make sure the form is valid only if all fields are valid
      formIsValid = updatedLoginForm[field].valid && formIsValid;
    }

    this.setState({loginFields: updatedLoginForm, formIsValid: formIsValid});
  }

  render () {
    const formElements = [];
    for (let key in this.state.loginFields) {
      formElements.push({
        id: key,
        config: this.state.loginFields[key]
      })
    }

    const formFields = formElements.map(elem => (
      <Input
        key={elem.id}
        elementType={elem.config.elementType}
        elementAttributes={elem.config.elementAttributes}
        value={elem.config.value}
        changed={(event) => this.formElementChangedHandler(event, elem.id)}
        invalid={!elem.config.valid}
        shouldValidate={elem.config.validation && elem.config.touched}
        />
    ));

    return (
      <div className={styles.Auth}>
        <form>
          {formFields}
          <Button btnType='submit' btnClass='Success'>Submit</Button>
        </form>
      </div>
    );
  }
}

export default Auth;
