import React from 'react';
import { LongformArticleContainer, LegacyPublicationContainer } from '../components';
import DataLoader from '../helpers/data-loader';

const PublicationEntry = props => (
  <div>
    {!props.content && <LegacyPublicationContainer {...props} />}
    {props.content && <LongformArticleContainer {...props} />}
  </div>
);

export default DataLoader(PublicationEntry, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `*[slug.current == $slug && !(_id in path "drafts.**")]{...,
      _id, title, subtitle, standfirst, pdfFile, slug, featuredImage, summary, summaryExternal, date, content,
      reference, bibliographicalOverride, abbreviations, blurbs, language, translation,
      "topics": topics->target,
      "references": references->target, mainPoints,
      "relatedContent": relatedContent->target, authors, notes, editors, partners, acknowledgements, abstract, keywords,
      "publicationType": publicationType }[0]`,
    param: { slug },
  }),
  materializeDepth: 2,
});
