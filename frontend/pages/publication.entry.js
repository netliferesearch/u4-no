import React from 'react';
import PropTypes from 'prop-types';
import { LongformArticleContainer, LegacyPublicationContainer } from '../components';
import DataLoader from '../helpers/data-loader';

const PublicationEntry = props => (

  <div>
    {
    (props.data.legacypdf && !props.data.content) ?
      <LegacyPublicationContainer {...props} /> :
      <LongformArticleContainer {...props} />
    }
  </div>
);

PublicationEntry.propTypes = {
  data: PropTypes.shape({
    legacypdf: PropTypes.shape({
      asset: PropTypes.shape({
        url: PropTypes.string,
      }),
      _type: PropTypes.string
    }),
    content: PropTypes.arrayOf(PropTypes.object),
  }),
};

PublicationEntry.defaultProps = {
  data: {
    legacypdf: '',
    content: [],
  },
};

export default DataLoader(PublicationEntry, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `*[slug.current == $slug && !(_id in path "drafts.**")]{...,
      _id, title, subtitle, standfirst, pdfFile, slug, featuredImage, summary, summaryExternal, date, content,
      reference, bibliographicalOverride, abbreviations, blurbs, language,
      "translations": coalesce(
        *[translation._ref == ^._id]{
           title,
           "slug": slug.current,
           language
         },
         translation->{
         title,
         "slug": slug.current,
         language
       }),
      "topics": topics->target,
      "references": references->target, mainPoints,
      "relatedContent": relatedContent->target, authors, notes, editors, partners, acknowledgements, abstract, keywords,
      "publicationType": publicationType }[0]`,
    param: { slug },
  }),
  materializeDepth: 2,
});
