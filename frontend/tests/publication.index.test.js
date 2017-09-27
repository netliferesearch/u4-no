/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import PublicationIndex from '../pages/publication.index';

test('publication index page', async () => {
  const props = await PublicationIndex.getInitialProps();
  expect(shallow(<PublicationIndex {...props} />).exists()).toBe(true);
});
