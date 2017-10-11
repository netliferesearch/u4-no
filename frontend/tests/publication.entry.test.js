/* eslint-disable no-unused-vars */
import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PublicationEntry from '../pages/publication.entry';

Enzyme.configure({ adapter: new Adapter() });

test('publication entry page', async () => {
  const props = await PublicationEntry.getInitialProps({
    query: { id: 'f62b433d-9bbf-4bcb-8a4d-9aed37e5afcd' },
  });
  expect(shallow(<PublicationEntry {...props} />).exists()).toBe(true);
});
