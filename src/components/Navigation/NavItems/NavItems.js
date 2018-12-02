import React from 'react';

import styles from './NavItems.module.css'
import NavItem from './NavItem/NavItem';

const navItems = (props) => {
  let dynamicPaths = (
    <NavItem link='/auth'>Auth</NavItem>
  );
  if (props.isAuth) {
    dynamicPaths = (
      <>
        <NavItem link='/orders'>Orders</NavItem>
        <NavItem link='/auth'>User</NavItem>
      </>
    );
  }
  return (
    <ul className={styles.NavItems}>
      <NavItem link='/' exact>Builder</NavItem>
      {dynamicPaths}
    </ul>
  );
};

export default navItems;
