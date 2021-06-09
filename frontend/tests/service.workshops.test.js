/* eslint-disable no-unused-vars */
import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WorkshopsServicePage from '../pages/workshops-and-events/index';

Enzyme.configure({ adapter: new Adapter() });

test('service: workshops', async () => {
  const props = await WorkshopsServicePage.getInitialProps({ query: {} });
  expect(shallow(<WorkshopsServicePage {...props} />).exists()).toBe(true);
});
