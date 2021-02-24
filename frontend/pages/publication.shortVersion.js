import React from 'react';
import PropTypes from 'prop-types';
// import { LongformArticleContainer } from '../components';
// import BreadCrumb from '../components/BreadCrumb';
import DataLoader from '../helpers/data-loader';
import { BreadCrumbV2 } from '../components/v2/BreadCrumbV2';
import LongformArticleContainer from '../components/v2/LongformArticleContainer';

const PublicationShort = props => {
  const {
    data: { title = '', summary = [] },
    url = {},
  } = props;
  const { query = {} } = url;
  const { slug = '' } = query;
  return (
    <LongformArticleContainer
      BreadCrumbComponent={
        // <BreadCrumb
        //   data={{
        //     _type: 'publication',
        //     slug: { current: slug },
        //     title,
        //   }}
        // />
        <BreadCrumbV2 title={title} parentSlug={`/publications/${slug}`} home={false} />
      }
      shortversionContent={summary}
      shortversion
    />
  );
};

PublicationShort.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    summary: PropTypes.arrayOf(PropTypes.object),
  }),
  url: PropTypes.shape({
    current: PropTypes.string,
  }).isRequired,
};
PublicationShort.defaultProps = {
  data: {
    title: 'No title',
    summary: 'No summary',
  },
};

export default DataLoader(PublicationShort, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: '*[slug.current == $slug][0]',
    param: { slug },
  }),
  materializeDepth: 1,
});
