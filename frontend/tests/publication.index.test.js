/* eslint-disable no-unused-vars */
import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PublicationIndex from '../pages/publication.index';

Enzyme.configure({ adapter: new Adapter() });

test('publication index page', async () => {
  const props = await PublicationIndex.getInitialProps();
  expect(shallow(<PublicationIndex {...props} />).exists()).toBe(true);
});
