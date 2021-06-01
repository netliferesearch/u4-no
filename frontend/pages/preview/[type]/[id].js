import React from 'react';
import PropTypes from 'prop-types';
import { LongformArticleContainer, LegacyPublicationContainer } from '../../../components';
import DataLoader from '../../../helpers/data-loader-preview';
import { localize } from '../../../helpers/translate';

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
  queryFunc: ({ query: { id = '' } }) => ({
    sanityQuery: `*[_id == $id]{ _type, _id,
      abbreviations, abstract, acknowledgements,
      authors[]->{ _id, affiliations, email, ${localize('firstName')}, slug, ${localize(
      'surname'
    )} },
      bibliographicalOverride, blurbs, content, date,
      editors[]->{ _id, affiliations, email, ${localize('firstName')}, slug, ${localize(
      'surname'
    )} },
      featuredImage, headsUp, keywords, language,
      lead, legacypdf, mainPoints, methodology, notes, partners, pdfFile, publicationNumber,
      publicationType->{ _id, title },
      reference, references,
      "recommendedResources":
        relatedContent[]->{ _type, _id, title, slug, publicationType->{ title }, articleType[0]->{ title }, publicationNumber, date, reference, featuredImage },
      "relatedResources":
          related[]->{ _type, _id, title, slug, publicationType->{ title }, articleType[0]->{ title }, publicationNumber, date, reference, featuredImage },
      slug, standfirst, subtitle, summary, summaryExternal, title,
      topics[]->{ _id, title, slug },
      "translations":
              *[_type == 'publication' && _id != ^._id && (_id==coalesce(^.translation._ref,^._id) || (translation._ref == coalesce(^.translation._ref,^._id)))]{_id,
                 title, "slug": slug.current, language
               },
      "updatedVersion": updatedVersion->{title,slug,publicationType,publicationNumber,date,reference},
    }[0]`,
    param: { id },
  }),
  materializeDepth: 2,
});
