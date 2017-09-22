import React, { Component } from 'react';
import throttle from 'lodash/throttle';
import {
  Layout,
  PublicationArticle,
  PublicationArticleHeader,
  TocMobile,
  ArticleTableOfContents,
} from '../components';
import DataLoader from '../helpers/data-loader';

class PublicationEntry extends Component {
  constructor(props) {
    super(props);
    this.scrollHandler = this.scrollHandler.bind(this);
    this.state = { navFollowScreen: false };
  }

  componentDidMount() {
    window.addEventListener('scroll', throttle(this.scrollHandler, 100));
    this.scrollHandler();
  }

  scrollHandler() {
    const elementTarget = document.getElementById('js-scroll-trigger');
    if (window.scrollY > elementTarget.offsetTop + elementTarget.offsetHeight) {
      console.log('navFollowScreen true');
      this.setState(() => ({ navFollowScreen: true }));
    } else {
      console.log('navFollowScreen false');
      this.setState(() => ({ navFollowScreen: false }));
    }
  }

  render() {
    const { lead = 'article had no lead' } = this.props;
    return (
      <Layout>
        <article>
          <span id="js-top" />
          <div id="js-scroll-trigger">
            {this.props.featuredImage &&
              this.props.featuredImage.asset.url && (
                <div className="c-hero">
                  <div className="o-wrapper">
                    <img
                      className="c-hero__image"
                      alt=""
                      src={this.props.featuredImage.asset.url}
                    />
                    <div className="o-wrapper-inner">
                      <div className="c-hero__grid-container">
                        <div className="c-hero__grid-container__bg" />
                        <PublicationArticleHeader
                          className="c-hero__grid-container__content links-wrapper-dark-background"
                          {...this.props}
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
                    <div
                      className={
                        this.state.navFollowScreen
                          ? 'c-article-nav c-article-nav--fixed'
                          : 'c-article-nav'
                      }
                    >
                      <ArticleTableOfContents {...this.props} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PublicationArticle {...this.props} />
          <span id="js-bottom" />
          <TocMobile {...this.props} />
        </article>
      </Layout>
    );
  }
}

export default DataLoader(PublicationEntry, {
  queryFunc: ({ query: { id = '' } }) => ({
    sanityQuery: '*[_id == $id][0]',
    param: { id },
  }),
  materializeDepth: 1,
});
