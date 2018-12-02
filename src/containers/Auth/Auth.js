import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Auth.module.css'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';

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
    formIsValid: false,
    signupMode: true
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

  switchAuthModeHandler = () => {
    this.setState((prevState) => ({
      signupMode: !prevState.signupMode
    }));
  }

  logOutHandler = () => {
    this.props.onLogOut();
  }

  // set up two-way binding to both display and extract input value
  formElementChangedHandler = (event, fieldName) => {
    const updatedLoginFields = {
      ...this.state.loginFields,
      [fieldName]: {
        ...this.state.loginFields[fieldName],
        value: event.target.value,
        valid: this.isFormFieldValid(event.target.value, this.state.loginFields[fieldName].validation),
        touched: true
      }
    };
    this.setState({loginFields: updatedLoginFields});
  }

  formSubmitHandler = event => {
    event.preventDefault();
    this.props.onAuth(this.state.loginFields.email.value, this.state.loginFields.password.value, this.state.signupMode);
  }

  componentDidUpdate = () => {
    if (this.props.isAuthenticated) {
      const query = new URLSearchParams(this.props.location.search);
      for (let param of query.entries()) {
        if (param[0] === 'next') {
          this.props.history.push(param[1]);
          break;
        }
      } // for loop
    } // auth check
  } // componentDidUpdate

  render () {
    const formElements = [];
    for (let key in this.state.loginFields) {
      formElements.push({
        id: key,
        config: this.state.loginFields[key]
      })
    }

    let formFields = formElements.map(elem => (
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

    if (this.props.loading) {
      formFields = <Spinner />;
    }

    let authPage = (
      <>
        <p className={styles.Warning}>{this.props.error ? this.props.error.message : null}</p>
        <form onSubmit={this.formSubmitHandler}>
          {formFields}
          <Button btnType='submit' btnClass='Success'>{this.state.signupMode ? 'Sign Up' : 'Log In'}</Button>
        </form>
          <Button
            clicked={this.switchAuthModeHandler}
            btnType='button'
            btnClass='Danger'>
            Switch to {this.state.signupMode ? 'Log-In' : 'Sign-Up'}
          </Button>
        </>
    );
    if (this.props.isAuthenticated) {
      authPage = (
        <>
          <p className={styles.Success}>Currently logged-in as {this.props.email}</p>
          <Button
            clicked={this.logOutHandler}
            btnType='button'
            btnClass='Danger'>
            Log Out
          </Button>
        </>
      );
    }

    return (
      <div className={styles.Auth}>
        {authPage}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  // make sure email & token are stored and erased together
  isAuthenticated: state.auth.token !== null,
  email: state.auth.email
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
  onLogOut: () => dispatch(actions.logOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
