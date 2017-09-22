import React from 'react';
import {
  Layout,
  PublicationArticle,
  PublicationArticleHeader,
  TocMobile,
  ArticleTableOfContents,
} from '../components';
import DataLoader from '../helpers/data-loader';

const PublicationEntry = (props) => {
  const { lead = 'article had no lead' } = props;
  return (
    <Layout>
      <article>
        {props.featuredImage &&
          props.featuredImage.asset.url && (
            <div className="c-hero">
              <div className="o-wrapper">
                <img className="c-hero__image" alt="" src={props.featuredImage.asset.url} />
                <div className="o-wrapper-inner">
                  <div className="c-hero__grid-container">
                    <div className="c-hero__grid-container__bg" />
                    <PublicationArticleHeader
                      className="c-hero__grid-container__content links-wrapper-dark-background"
                      {...props}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        <div className="o-wrapper-inner">
          <div className="o-grid-container">
            <div className="o-grid-container__item-standard">
              <p className="c-article c-lead">{lead}</p>
            </div>
          </div>
        </div>
        <ArticleTableOfContents {...props} />
        <PublicationArticle {...props} />
        <TocMobile {...props} />
      </article>
    </Layout>
  );
};

export default DataLoader(PublicationEntry, {
  queryFunc: ({ query: { id = '' } }) => ({
    sanityQuery: '*[_id == $id][0]',
    param: { id },
  }),
  materializeDepth: 1,
});
