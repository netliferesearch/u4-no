/* eslint-disable no-unused-vars */
import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TopicEntry from '../pages/topic.entry';

Enzyme.configure({ adapter: new Adapter() });

test('topic entry page', async () => {
  const props = await TopicEntry.getInitialProps({
    query: { id: 'a8f6ad54-3a41-4ceb-b361-4febfb6fe67d' },
  });
  expect(shallow(<TopicEntry {...props} />).exists()).toBe(true);
});
