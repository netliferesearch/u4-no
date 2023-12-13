import React from 'react';
import PropTypes from 'prop-types';
import { fetchAndMaterialize } from '../../../helpers/data-loader';
import { initStore } from '../../../helpers/redux-store';
import { Provider } from 'react-redux';
import PublicationContainer from '../../../components/publication/PublicationContainer';

const store = initStore();

const PublicationEntry = props => {
  return (
    <Provider store={store}>
      <PublicationContainer data={props.data} shortversionContent={props.data.summary} shortversion />
    </Provider>
  );
};

PublicationEntry.propTypes = {
  data: PropTypes.shape({
    summary: PropTypes.arrayOf(PropTypes.object),
  }),
};

PublicationEntry.defaultProps = {
  data: {
    summary: [],
  },
};

export default PublicationEntry;

const queryFunc = ({ params: { slug = '' } }) => ({
  sanityQuery: `*[_type == 'publication' && slug.current == $slug]{ _type, _id,
  featuredImage{asset->{url}}, 
  language,
  publicationType->{ _id, title },
  "recommendedResources":
    relatedContent[]->{ _type, _id, title, slug, publicationType->{ title }, "articleTypeTitle": articleType[0]->title, publicationNumber, date, reference, "imageUrl": featuredImage.asset->url },
  "relatedResources":
      related[]->{ _type, _id, title, slug, publicationType->{ title }, "articleTypeTitle": articleType[0]->title, publicationNumber, date, reference, "imageUrl": featuredImage.asset->url },
  slug, subtitle, summary, summaryExternal, title,
}[0]`,
  param: { slug },
});

export const getStaticProps = async ctx => {
  const { data, error = '' } = await fetchAndMaterialize({
    nextContext: ctx,
    queryFunc,
    materializeDepth: 2,
  });
  if (error === 'No content found (dataLoader said this)') {
    return { notFound: true };
  }
  return {
    props: { data },
    revalidate: 60,
  };
};

export const getStaticPaths = async ctx => {
  return {
    paths: [],
    fallback: true,
  };
};