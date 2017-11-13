/* eslint-disable no-unused-vars */
import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AboutServicePage from '../pages/service.about';

Enzyme.configure({ adapter: new Adapter() });

test('about page', async () => {
  const props = await AboutServicePage.getInitialProps({ query: {} });
  expect(shallow(<AboutServicePage {...props} />).exists()).toBe(true);
});
