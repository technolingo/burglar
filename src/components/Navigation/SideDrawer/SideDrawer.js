import React from 'react';

import styles from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../UI/Backdrop/Backdrop';


const sideDrawer = (props) => {
  let classes = [styles.SideDrawer, styles.Closed];

  if (props.isOpen) {
    classes = [styles.SideDrawer, styles.Open];
  }

  return (
    <>
      <Backdrop
        display={props.isOpen}
        clicked={props.closed}
      />

      <div className={classes.join(' ')} onClick={props.closed}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavItems isAuth={props.isAuth} />
        </nav>
      </div>
    </>
  );
}

export default sideDrawer;
