/* eslint-disable no-unused-vars */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PublicationEntry from '../pages/publications/[slug]/index';
import { client } from '../helpers/picoSanityClient';

Enzyme.configure({ adapter: new Adapter() });

test.skip('publication entry page', async () => {
  const doc = await client.fetch(
    '*[_type == "publication" && defined(slug) && !(_id in path "drafts.**")][0]{_id, _type, slug}'
  );
  const props = await PublicationEntry.getInitialProps({
    query: {
      slug: doc.slug.current,
    },
  });
  expect(shallow(<PublicationEntry {...props} />).exists()).toBe(true);
});
