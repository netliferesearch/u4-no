/* eslint-disable no-unused-vars */
import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BreadCrumb from './BreadCrumb';

Enzyme.configure({ adapter: new Adapter() });

test('can link back to a topic page', async () => {
  const props = {
    data: {
      _type: 'topics',
      title: 'Natural resources and energy',
      slug: { current: 'natural-resources-and-energy' },
    },
  };
  const wrapper = shallow(<BreadCrumb {...props} />);
  expect(wrapper.html()).toEqual(
    expect.stringContaining('href="/topics/natural-resources-and-energy"')
  );
});

test('can link back to a publication page', async () => {
  const props = {
    data: {
      _type: 'publication',
      title: 'Publication name',
      slug: { current: 'publication-name' },
    },
  };
  const wrapper = shallow(<BreadCrumb {...props} />);
  expect(wrapper.html()).toEqual(expect.stringContaining('href="/publications/publication-name"'));
});
