import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { fetchAndMaterialize } from '../../../helpers/data-loader';
import { localize } from '../../../helpers/translate';
import { initStore } from '../../../helpers/redux-store';
import { Provider } from 'react-redux';
// import { PublicationContainer } from '../../../components/publication/PublicationContainer';

// const LongformArticleContainer = dynamic(() =>
//   import('../../../components/LongformArticleContainer')
// );

const LegacyPublicationContainer = dynamic(() =>
  import('../../../components/publication/LegacyPublicationContainer')
);

const PublicationContainer = dynamic(() =>
  import('../../../components/publication/PublicationContainer')
);

const store = initStore();

const PublicationEntry = props => {
  // console.log(props.data)
  return (
    <Provider store={store}>
      {props.data.legacypdf && !props.data.content ? (
        <LegacyPublicationContainer {...props} />
      ) : (
        // <LongformArticleContainer {...props} />
        <PublicationContainer {...props} />
      )}
    </Provider>
  );
};

PublicationEntry.propTypes = {
  data: PropTypes.shape({
    legacypdf: PropTypes.shape({
      asset: PropTypes.shape({
        url: PropTypes.string,
      }),
      _type: PropTypes.string,
    }),
    content: PropTypes.arrayOf(PropTypes.object),
  }),
};

PublicationEntry.defaultProps = {
  data: {
    legacypdf: {
      asset: {
        url: ''
      }
    },
    content: [],
  },
};

export default PublicationEntry;

const queryFunc = ({ params: { slug = '' } }) => ({
  sanityQuery: `*[_type == 'publication' && slug.current == $slug]{ _type, _id,
  abbreviations, abstract, acknowledgements,
  authors[]->{_id, ${localize('bioShort')}, affiliations[]->{_id,name}, email, ${localize('firstName')}, slug, ${localize('surname')}, position },
  bibliographicalOverride, blurbs, content, date,
  editors[]->{ _id, affiliations[]->{_id,name}, email, ${localize('firstName')}, slug, ${localize('surname')}, position },
  featuredImage{caption,credit,sourceUrl,license,asset->{url}}, 
  headsUp, 
  keywords[]->{_id, keyword, category, translation->{_id, keyword}}, 
  language,
  lead, legacypdf, mainPoints, methodology, notes, partners, pdfFile, 
  pdfThumbnail{_type,asset->{url,metadata{lqip,dimensions{width,height}}}},
  publicationNumber,
  publicationType->{ _id, title },
  reference, references,
  "recommendedResources":
    relatedContent[]->{ _type, _id, title, slug, publicationType->{ title }, "articleTypeTitle": articleType[0]->title, publicationNumber, date, reference, "imageUrl": featuredImage.asset->url },
  "relatedResources":
      related[]->{ _type, _id, title, slug, publicationType->{ title }, "articleTypeTitle": articleType[0]->title, publicationNumber, date, reference, "imageUrl": featuredImage.asset->url },
  slug, standfirst, subtitle, summary, summaryExternal, title,
  topics[]->{ _id, title, slug },
  "translations":
          *[_type == 'publication' && _id != ^._id && (_id==coalesce(^.translation._ref,^._id) || (translation._ref == coalesce(^.translation._ref,^._id)))]{_id,
             title, "slug": slug.current, language
           },
  "updatedVersion": updatedVersion->{title,slug,publicationType,publicationNumber,date,reference},
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
    fallback: 'blocking',
  };
};
