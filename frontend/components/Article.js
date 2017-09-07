import React from 'react';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';
import slugify from 'slugify';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import ArticleContents from './ArticleContents';
import randomKey from '../helpers/randomKey';
configureAnchors({ offset: -60, scrollDuration: 200, keepLastAnchorHash: true })

const Figure = ({asset, caption, license, licensor}) => (<figure className="c-article__figure">
  <img className="c-article__figure-img" src={asset.url} alt={asset.altText} />
  <figcaption className="c-article__figure-figcaption">
    {caption}
    {license}
    {licensor}
  </figcaption>
</figure>)

const blockHandlers = {
  listBlock: {
    number: ({ children = [] }) => <ol key={randomKey()} className="list-numbered">{children}</ol>,
    bullet: ({ children = [] }) => <ul key={randomKey()} className="list-bullets">{children}</ul>,
    listItem: ({ children = [] }) => <li key={randomKey()}>{children}</li>,
  },
  textBlock: {
    normal: ({ children = [] }) => <p className="lede">{children}</p>,
    h2: ({ children = [] }) => <ScrollableAnchor id={slugify(children[0], { lower: true })}><h2>{children}</h2></ScrollableAnchor>,
  },
};

const typeHandlers = {
  image: ({ attributes }) => <Figure {...attributes} />,
  pullQuote: ({ attributes: { text } }) => <div className="c-article__pullQuote">{text}</div>,
  nugget: ({ attributes: { text, title } }) => <div className="c-article__nugget"><h2>{title}</h2><BlockContent blocks={text} /></div>,
};

const Article = ({ title = 'No title', subtitle = 'No subtitle', _updatedAt = 'No date', lead = 'No lead', content = [] }) => (
  <article className="o-wrapper">
    <div className="c-article-nav">
      <ArticleContents content={content} />
    </div>
    <header className="c-article-header o-wrapper--huge">
      <div className="c-article-header__issue"><a href="#">U4 issue </a>| NRE</div>
      <h1 className="c-article-header__title">{title}</h1>
      <p className="c-article-header__subtitle">{subtitle}</p>
      <div className="c-article-header__byline">By <a href="#">Åse Gilje Østensen</a> & <a href="#">Mats Stridsman </a>
         | Bergen: Chr. Michelsen Institute (U4 Issue 2017:3)</div>
      <div className="c-article-header__photo-credit">Photography by <a href="#">Dani Deahl</a></div>
      <div className="c-article-header__topics">
        <div className="c-article-header__topics-item">Anti-Corruption</div>
        <div className="c-article-header__topics-item">Poverty sanitation</div>
        <div className="c-article-header__topics-item">Water sector</div>
      </div>
      <p className="c-article-header__lead">{lead}</p>
    </header>
    <main>
      <div className="c-article o-wrapper--huge">
        <BlockContent
          blocks={content.filter(block => !['reference'].includes(block._type))}
          blockTypeHandlers={{ ...blockHandlers }}
          customTypeHandlers={typeHandlers}
        />
      </div>
    </main>
  </article>
);

export default Article;
