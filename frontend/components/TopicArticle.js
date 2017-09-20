import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';
import slugify from 'slugify';
import Waypoint from 'react-waypoint';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import ArticleContents from './ArticleContents';
import TocMobile from './TocMobile';
import { PullQuote, Figure } from './';
import randomKey from '../helpers/randomKey';

configureAnchors({ offset: -60, scrollDuration: 400, keepLastAnchorHash: true });

/**
 * Here we replace Sanity's react components for rendering basic things like
 * lists so that we can drop in our classnames
 * @type {Object}
 */
const blockTypeHandlersOverride = {
  listBlock: {
    number: ({ children = [] }) => (
      <ol key={randomKey()} className="list-numbered o-grid-container__item-standard">
        {children}
      </ol>
    ),
    bullet: ({ children = [] }) => (
      <ul key={randomKey()} className="list-bullets o-grid-container__item-standard">
        {children}
      </ul>
    ),
    listItem: ({ children = [] }) => <li key={randomKey()}>{children}</li>,
  },
  textBlock: {
    normal: ({ children = [] }) => (
      <p key={randomKey()} className="o-grid-container__item-standard">
        {children}
      </p>
    ),
    h2: ({ children = [] }) => (
      <ScrollableAnchor key={randomKey()} id={slugify(children[0], { lower: true })}>
        <h2 className="o-grid-container__item-standard">{children}</h2>
      </ScrollableAnchor>
    ),
    h3: ({ children = [] }) => (
      <h3 key={randomKey()} className="o-grid-container__item-standard">
        {children}
      </h3>
    ),
    h4: ({ children = [] }) => (
      <h4 key={randomKey()} className="o-grid-container__item-standard">
        {children}
      </h4>
    ),
    blockquote: ({ children = [] }) => (
      <blockquote key={randomKey()} className="o-grid-container__item-standard">
        {children}
      </blockquote>
    ),
  },
};

const customTypeHandlers = {
  image: ({ attributes }) => <Figure key={randomKey()} {...attributes} />,
  pullQuote: ({ attributes: { text } }) => <PullQuote key={randomKey()}>{text}</PullQuote>,
  nugget: ({ attributes: { text, title } }) => (
    <div key={randomKey()} className="c-article__nugget o-grid-container__item-wider">
      <h2 className="c-article__nugget-title">{title}</h2>
      <BlockContent blocks={text} />
    </div>
  ),
};

class TopicArticle extends Component {
  constructor(props) {
    super(props);
    this.state = { navFollowScreen: false };
    this.waypointHandler = this.waypointHandler.bind(this);
  }

  waypointHandler({ currentPosition }) {
    if (currentPosition === 'above') {
      this.setState(() => ({ navFollowScreen: true }));
    } else {
      this.setState(() => ({ navFollowScreen: false }));
    }
  }

  render() {
    const {
      title = 'No title',
      subtitle = 'No subtitle',
      _updatedAt = 'No date',
      lead = 'No lead',
      introduction = [],
    } = this.props;
    return (
      <article className="o-wrapper">
        <header className="c-article-header o-grid-container">
          {/* Wrap in standard grid width until we know better */}
          <p className="o-grid-container__item-standard">
            <Waypoint onPositionChange={this.waypointHandler}>
              <span>
                <a>Basic Guide</a>
              </span>
            </Waypoint>
          </p>
          <div className="o-grid-container__item-standard">
            <h1 className="c-article-header__title">{title}</h1>
          </div>
          <div className="o-grid-container__item-standard-right">
            <div
              className={
                this.state.navFollowScreen ? 'c-article-nav c-article-nav--fixed' : 'c-article-nav'
              }
            >
              <ArticleContents content={introduction} />
            </div>
          </div>
          <div className="o-grid-container__item-standard">
            <p className="c-article-header__lead">{lead}</p>
          </div>
        </header>
        <main className="c-article o-grid-container-sub-div">
          <BlockContent
            blocks={introduction.filter(block => !['reference'].includes(block._type))}
            blockTypeHandlers={{ ...blockTypeHandlersOverride }}
            customTypeHandlers={customTypeHandlers}
          />
        </main>
        <footer className="o-grid-container">
          <div className="o-grid-container__item-standard">
            {/* TODO add expandable endnotes/footnotes */}
            {/* Comes after all */}
            <details>
              <summary>We also recommend</summary>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, earum velit reiciendis
                ullam sapiente quidem pariatur repudiandae dolorem amet vel rem vitae delectus
                minima, vero numquam totam obcaecati eligendi blanditiis?
              </p>
            </details>
          </div>
        </footer>
        <TocMobile {...this.props} />
      </article>
    );
  }
}

export default TopicArticle;
