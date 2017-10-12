/* eslint-disable no-unused-vars */
import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TopicEntry from '../pages/topic.entry';

Enzyme.configure({ adapter: new Adapter() });

test('topic entry page', async () => {
  const props = await TopicEntry.getInitialProps({
    query: { slug: 'natural-resources-and-energy' },
  });
  expect(shallow(<TopicEntry {...props} />).exists()).toBe(true);
});
