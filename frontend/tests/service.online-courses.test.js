/* eslint-disable no-unused-vars */
import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OnlineCoursesServicePage from '../pages/service.online-courses';

Enzyme.configure({ adapter: new Adapter() });

test('service: online courses page', async () => {
  const props = await OnlineCoursesServicePage.getInitialProps({ query: {} });
  expect(shallow(<OnlineCoursesServicePage {...props} />).exists()).toBe(true);
});
