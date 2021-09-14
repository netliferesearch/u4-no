import React from 'react';
import PropTypes from 'prop-types';
import LongformArticleContainer from '../../../components/LongformArticleContainer';
import BreadCrumb from '../../../components/BreadCrumb';
import DataLoader from '../../../helpers/data-loader';
import { wrapInRedux } from '../../../helpers/redux-store-wrapper';
import PublicationContainer from '../../../components/publication/PublicationContainer';

const TopicArticleEntry = props => {
  const {
    data: { title = '', summary = [], _type = '', slug = '' },
    url = {},
  } = props;
  console.log("summary", summary)
  return (
    // <LongformArticleContainer
    //   BreadCrumbComponent={<BreadCrumb data={{ _type: _type, slug: slug, title }} />}
    //   content={summary}
    //   shortversion
    // />
    <PublicationContainer data={props.data} shortversionContent={summary} shortversion />
  );
};

TopicArticleEntry.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    summary: PropTypes.arrayOf(PropTypes.object),
  }),
  url: PropTypes.shape({
    current: PropTypes.string,
  }).isRequired,
};
TopicArticleEntry.defaultProps = {
  data: {
    title: 'No title',
    summary: 'No summary',
  },
};

export default wrapInRedux(
  DataLoader(TopicArticleEntry, {
    queryFunc: ({ query: { slug = '' } }) => ({
      sanityQuery: '*[slug.current == $slug][0]',
      param: { slug },
    }),
    materializeDepth: 1,
  })
);
