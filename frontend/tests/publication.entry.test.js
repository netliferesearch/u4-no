/* eslint-disable no-unused-vars */
import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PublicationEntry from '../pages/publication.entry';

Enzyme.configure({ adapter: new Adapter() });

test('publication entry page', async () => {
  const props = await PublicationEntry.getInitialProps({
    query: {
      slug: 'effective-donor-coordination-models-for-multi-donor-technical-assistance',
    },
  });
  expect(shallow(<PublicationEntry {...props} />).exists()).toBe(true);
});
