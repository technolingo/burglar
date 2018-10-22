import React, { Component } from 'react';

import styles from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


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
        <Toolbar openDrawer={this.sideDrawerToggleHandler} />
        <SideDrawer
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


export default Layout;
