import React from 'react';
import PropTypes from 'prop-types';
import DataLoader from '../../../../helpers/data-loader-preview-new';
import { wrapInRedux } from '../../../../helpers/redux-store-wrapper';
import PublicationContainer from '../../../../components/publication/PublicationContainer';

const ShortVersionEntry = props => {
  const {
    data: { title = '', summary = [], _type = '', slug = '' },
    url = {},
  } = props;
  // console.log("summary", summary)
  return (
    // <LongformArticleContainer
    //   BreadCrumbComponent={<BreadCrumb data={{ _type: _type, slug: slug, title }} />}
    //   content={summary}
    //   shortversion
    // />
    <PublicationContainer data={props.data} shortversionContent={summary} shortversion />
  );
};

ShortVersionEntry.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    summary: PropTypes.arrayOf(PropTypes.object),
  }),
  url: PropTypes.shape({
    current: PropTypes.string,
  }).isRequired,
};
ShortVersionEntry.defaultProps = {
  data: {
    title: 'No title',
    summary: 'No summary',
  },
};

export default wrapInRedux(
  DataLoader(ShortVersionEntry, {
    queryFunc: ({ query: { id = '' } }) => ({
      sanityQuery: '*[_id == $id][0]',
      param: { id },
    }),
    materializeDepth: 1,
  })
);
