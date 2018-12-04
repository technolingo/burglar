import React from 'react';

import { configure, shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import Controls from '../../components/Burger/Controls/Controls';

configure({adapter: new EnzymeAdapter()});

describe('<BurgerBuilder />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitializeIngredients={() => {}} />);
  });

  it('should render 1 <Controls /> if ingredients are present', () => {
    wrapper.setProps({ings: {meat: 1}});
    expect(wrapper.find(Controls)).toHaveLength(1);
  });

  it('should NOT render <Controls /> if ingredients are not present', () => {
    expect(wrapper.find(Controls)).toHaveLength(0);
  });
});
