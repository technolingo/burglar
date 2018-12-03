import React from 'react';

import { configure, shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import NavItems from './NavItems';
import NavItem from './NavItem/NavItem';

configure({adapter: new EnzymeAdapter()});

describe('<NavItems />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavItems />);
  });

  it('should render 2 <NavItems /> elements if not authenticated', () => {
    expect(wrapper.find(NavItem)).toHaveLength(2);
  });

  it('should render 3 <NavItems /> elements if authenticated', () => {
    wrapper.setProps({isAuth: true});
    expect(wrapper.find(NavItem)).toHaveLength(3);
  });

  it('should NOT contain a <NavItems /> pointing to /orders if not authenticated', () => {
    expect(wrapper.contains(<NavItem link='/orders'>Orders</NavItem>)).toEqual(false);
  });

  it('should contain a <NavItems /> pointing to /orders if authenticated', () => {
    wrapper.setProps({isAuth: true});
    expect(wrapper.contains(<NavItem link='/orders'>Orders</NavItem>)).toEqual(true);
  });
});
