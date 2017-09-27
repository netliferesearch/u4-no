import React from 'react';
import {
  Layout,
  PublicationArticle,
  PublicationArticleHeader,
  TableOfContentsButton,
  TableOfContentsSidebar,
} from '../components';
import DataLoader from '../helpers/data-loader';

const PublicationEntry = (props) => {
  const { lead = 'article had no lead' } = props;
  return (
    <Layout>
      <article>
        <span id="js-top" />
        <div id="js-scroll-trigger">
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
        </div>
        <div className="o-wrapper-inner">
          <div className="o-grid-container">
            <div className="o-grid-container__item-standard-full-right">
              <div className="c-lead-and-toc">
                <div className="c-lead-and-toc__lead c-article c-lead">{lead}</div>
                <div className="c-lead-and-toc__toc">
                  <TableOfContentsSidebar {...props} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <PublicationArticle {...props} />
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
