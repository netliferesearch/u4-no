import React from 'react';
import { Layout, PublicationArticle, PublicationArticleHeader } from '../components';
import DataLoader from '../helpers/data-loader';
import TocMobile from '../components/TocMobile';
import ArticleContents from '../components/ArticleContents';

const PublicationEntry = props => (
  <Layout>
    <article>
      {props.featuredImage &&
        props.featuredImage.asset.url && (
          <div className="o-wrapper">
            <div className="c-hero">
              <img className="c-hero__image" src={props.featuredImage.asset.url} />
              <PublicationArticleHeader className="c-hero__text" {...props} />
            </div>
          </div>
        )}
      <PublicationArticle {...props} />
      <TocMobile {...props} />
    </article>
  </Layout>
);

export default DataLoader(PublicationEntry, {
  queryFunc: ({ query: { id = '' } }) => ({
    sanityQuery: '*[_id == $id][0]',
    param: { id },
  }),
  materializeDepth: 1,
});
