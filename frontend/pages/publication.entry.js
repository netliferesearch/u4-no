import React from 'react';
import {
  Layout,
  LongformArticle,
  PublicationArticleHeader,
  TableOfContentsButton,
  TableOfContentsSidebar,
} from '../components';
import DataLoader from '../helpers/data-loader';

const PublicationEntry = (props) => {
  const { lead = 'article had no lead' } = props;
  return (
    <Layout>
      <article className="o-wrapper o-wrapper--no-padding">
        <span id="js-top" />
        <div id="js-scroll-trigger">
          {props.featuredImage &&
            props.featuredImage.asset.url && (
              <div className="c-hero">
                <div
                  className="c-hero-image"
                  style={{
                    backgroundImage: `url(${props.featuredImage.asset.url})`,
                  }}
                />
                <div className="c-hero-bg" />
                <div className="c-hero-header">
                  <PublicationArticleHeader
                    className="c-hero__grid-container__content links-wrapper-dark-background"
                    {...props}
                  />
                </div>
              </div>
            )}
        </div>
        <div className="c-longform-grid">
          <div className="c-article c-longform-grid__standard">
            <p>{lead}</p>
          </div>
          <div className="c-longform-grid__sidebar-right">
            <TableOfContentsSidebar {...props} />
          </div>
        </div>
        <LongformArticle {...props} />
        <span id="js-bottom" />
        <TableOfContentsButton {...props} />
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
