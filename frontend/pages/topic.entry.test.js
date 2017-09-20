/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import TopicEntry from './topic.entry';

test('topic entry page', async () => {
  const props = await TopicEntry.getInitialProps({
    query: { id: 'a8f6ad54-3a41-4ceb-b361-4febfb6fe67d' },
  });
  expect(shallow(<TopicEntry {...props} />).exists()).toBe(true);
});
