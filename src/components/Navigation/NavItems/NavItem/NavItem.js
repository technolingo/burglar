import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavItem.module.css';

const navItem = (props) => (
  <li className={styles.NavItem}>
    <NavLink
      exact={props.exact}
      to={props.link}
      activeClassName={styles.active}
      >{props.children}
    </NavLink>
  </li>
);


export default navItem;
