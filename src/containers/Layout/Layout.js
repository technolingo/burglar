import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
  state = {
    showBackdrop: false,
    showSideDrawer: false
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => ({showSideDrawer: !prevState.showSideDrawer}));
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  render () {
    return (
      <>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          openDrawer={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          closed={this.sideDrawerClosedHandler}
          isOpen={this.state.showSideDrawer}
        />
        <main className={styles.Content} >
          {this.props.children}
        </main>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps)(Layout);
