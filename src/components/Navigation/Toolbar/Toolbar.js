import React from 'react';

import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';


const toolbar = (props) => (
  <header className={styles.Toolbar}>
    <DrawerToggle clicked={props.openDrawer} />
    <div className={styles.Logo}>
      <Logo />
    </div>
    <nav className={styles.DesktopOnly}>
      <NavItems isAuth={props.isAuth} />
    </nav>
  </header>
);


export default toolbar;
