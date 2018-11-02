import React, { Component } from 'react';

import Model from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    // use componentWillMount instead of componentDidMount
    // to catch errors in the initial request to database
    // still not causing side effects since it only registers the errors
    componentWillMount = () => {
      // clear error on every request
      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });
      // record error on every response
      this.responseInterceptor = axios.interceptors.response.use(res => res, e => {
        this.setState({error: e});
      });
    }

    // remove old interceptors that are no longer needed
    componentWillUnmount = () => {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    }

    render () {
      return (
        <>
          <Model display={this.state.error}
            close={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Model>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  }
}


export default withErrorHandler;
