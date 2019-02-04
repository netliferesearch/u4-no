import React from 'react';
import PropTypes from 'prop-types';
import { LongformArticleContainer, LegacyPublicationContainer } from '../components';
import DataLoader from '../helpers/data-loader';

const PublicationEntry = props => (
  <div>
    {props.data.legacypdf && !props.data.content ? (
      <LegacyPublicationContainer {...props} />
    ) : (
      <LongformArticleContainer {...props} />
    )}
  </div>
);

PublicationEntry.propTypes = {
  data: PropTypes.shape({
    legacypdf: PropTypes.shape({
      asset: PropTypes.shape({
        url: PropTypes.string,
      }),
      _type: PropTypes.string.isRequired,
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
    sanityQuery: `*[slug.current == $slug]{...,
      _id, title, subtitle, standfirst, pdfFile, slug, featuredImage, summary, summaryExternal, date, content,
      reference, bibliographicalOverride, abbreviations, blurbs, language,
      "translations":
              *[_type == 'publication' && _id != ^._id && (_id==coalesce(^.translation._ref,^._id) || (translation._ref == coalesce(^.translation._ref,^._id)))]{_id,
                 title,
                 "slug": slug.current,
                 language
               },
      "updatedVersion": updatedVersion->{title,slug,publicationType,publicationNumber,date,reference},
      "topics": topics[]->{_id,title,slug},
      "references": references->target, mainPoints,
      "recommendedResources": relatedContent[]->{_type,title,slug,publicationType->{title},articleType[0]->{title},publicationNumber,date,reference},
      authors, notes, editors, partners, acknowledgements, abstract, keywords,
      "publicationType": publicationType->{_id,title,description} }[0]`,
    param: { slug },
  }),
  materializeDepth: 2,
});
