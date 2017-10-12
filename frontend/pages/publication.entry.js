import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleArticleMenu, toggleLoadingScreen } from '../helpers/redux-store';
import {
  Layout,
  LongformArticle,
  PublicationArticleHeader,
  TableOfContentsButton,
  TableOfContentsSidebar,
  TableOfContentsContent,
  CustomScrollSpy,
} from '../components';
import DataLoader from '../helpers/data-loader';

const PublicationEntry = (props) => {
  const {
    toggleArticleMenu,
    toggleLoadingScreen,
    isArticleMenuOpen,
    showLoadingScreen,
    lead = 'article had no lead',
    mainPoints = [],
    resources = [],
  } = props;
  return (
    <Layout showLoadingScreen={showLoadingScreen} showTopTab={!isArticleMenuOpen}>
      {isArticleMenuOpen && (
        <div
          className={`c-article-nav-fullscreen ${isArticleMenuOpen
            ? 'c-article-nav-fullscreen c-article-nav-fullscreen--open'
            : ''}`}
        >
          <TableOfContentsButton {...props} />
          <TableOfContentsContent
            showAllItems
            onItemSelected={(e) => {
              const linkThatWasClicked = e.target;
              // prevent this from triggering multiple times
              if (!showLoadingScreen) {
                toggleLoadingScreen();
                setTimeout(() => {
                  toggleArticleMenu();
                  linkThatWasClicked.click();
                  setTimeout(() => {
                    toggleLoadingScreen();
                  }, 1);
                }, 1);
              }
            }}
            {...props}
          />
        </div>
      )}
      {!isArticleMenuOpen && (
        <article className="o-wrapper o-wrapper--no-padding">
          <TableOfContentsButton {...props} />
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
                  <div className="c-hero-sideText">
                    <a href={props.featuredImage.sourceUrl}>{props.featuredImage.credit}</a>
                  </div>
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
            <div className="c-longform-grid__standard">
              <div className="c-article">
                <p>{lead}</p>
              </div>
              {mainPoints.length > 0 && (
                <div className="c-article c-article_mainPoints">
                  <h2>Main points</h2>
                  <ul className="c-article_mainPoints-list">
                    {mainPoints.map((mainPoint, index) => (
                      <li key={index} className="c-article_mainPoints-item">
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
            <div className="c-longform-grid__sidebar-right">
              <TableOfContentsSidebar {...props} />
            </div>
          </div>
          <LongformArticle {...props} />
          <span id="js-bottom" />
          <section>
            <h2 className="c-statement">
              Inform your anti-corruption work with handpicked topic related publications, insights
              and ideas.
            </h2>
            <div className="o-wrapper-medium c-mosaic">
              {resources.length ? (
                <div
                  className="c-mosaic_item"
                  style={{
                    backgroundImage: `url(${resources[0].imageUrl})`,
                  }}
                >
                  >
                </div>
              ) : null}
              {resources.map(
                (
                  { title = '', _id = '', _type = '', imageUrl = '', titleColor = '#FFF' },
                  index,
                ) => (
                  <a
                    href={`/publications/${_id}`}
                    className={`c-mosaic_item ${index % 4 === 2
                      ? 'c-mosaic_item--backgroundImage'
                      : ''} ${index % 4 === 2 && titleColor === '#000'
                      ? 'c-mosaic_item--backgroundImage-invert'
                      : ' '}`}
                    style={{
                      backgroundImage: `url(${index % 4 === 2 ? imageUrl : ''})`,
                    }}
                  >
                    <div className="c-mosaic_item-content">
                      <div
                        className="c-mosaic_item-content__meta"
                        style={{
                          color: index % 4 === 2 ? titleColor : ' ',
                        }}
                      >
                        {_type}
                      </div>
                      <div>
                        <h3
                          style={{
                            color: index % 4 === 2 ? titleColor : ' ',
                          }}
                        >
                          {title}
                        </h3>
                      </div>
                    </div>
                  </a>
                ),
              )}
            </div>
            <h2 className="c-statement">
              <a href="#">Explore all our resources -></a>
            </h2>
          </section>
        </article>
      )}
    </Layout>
  );
};

export default DataLoader(
  connect(
    state => state,
    dispatch => ({
      toggleArticleMenu: bindActionCreators(toggleArticleMenu, dispatch),
      toggleLoadingScreen: bindActionCreators(toggleLoadingScreen, dispatch),
    }),
  )(PublicationEntry),
  {
    queryFunc: ({ query: { slug = '' } }) => ({
      sanityQuery: '*[slug.current == $slug && !(_id in path "drafts.**")][0]',
      param: { slug },
    }),
    materializeDepth: 1,
  },
);
