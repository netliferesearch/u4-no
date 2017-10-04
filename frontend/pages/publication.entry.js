import React from 'react';
import {
  Layout,
  LongformArticle,
  PublicationArticleHeader,
  TableOfContentsButton,
  TableOfContentsSidebar,
  CustomScrollSpy,
} from '../components';
import DataLoader from '../helpers/data-loader';

const PublicationEntry = (props) => {
  const { lead = 'article had no lead', mainPoints = [] } = props;
  return (
    <Layout>
      <article className="o-wrapper o-wrapper--no-padding">
        <CustomScrollSpy {...props} />
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
                <div className="c-hero-sideText">Photo: Cristiano Zingale</div>
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
          {mainPoints.length > 0 && (
            <div className="c-article c-article_mainPoints c-longform-grid__standard">
              <ul>
                {mainPoints.map((mainPoint, index) => (
                  <li key={index}>
                    <span className="c-article_mainPoints-firstWords">
                      {mainPoint
                        .split(' ')
                        .slice(0, 3)
                        .join(' ')}{' '}
                    </span>
                    <span className="c-article_mainPoints-lastWords">
                      {mainPoint
                        .split(' ')
                        .slice(3)
                        .join(' ')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
