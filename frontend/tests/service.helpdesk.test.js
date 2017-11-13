/* eslint-disable no-unused-vars */
import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HelpdeskServicePage from '../pages/service.helpdesk';

Enzyme.configure({ adapter: new Adapter() });

test('service: helpdesk page', async () => {
  const props = await HelpdeskServicePage.getInitialProps({ query: {} });
  expect(shallow(<HelpdeskServicePage {...props} />).exists()).toBe(true);
});
