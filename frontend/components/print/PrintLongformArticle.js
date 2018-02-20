/* eslint-disable react/no-danger */
import React, { PureComponent } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import Head from 'next/head';
import serializers from '../printSerializers';
import buildTitleObjects from '../TableOfContents/buildTitleObjects';
import stylesheet from '../../style/print.scss';

/**
 * Here we replace Sanity's react components for rendering basic things like
 * lists so that we can drop in our classnames
 * @type {Object}
 */

class LongformArticle extends PureComponent {
  render() {
    const {
      content = [], abstract = [], notes = [], authors = [], acknowledgements = [], editors = [], references = [],
    } = this.props;
    const blocks = content.filter((block = {}) => block && !['reference'].includes(block._type));
    return (
      <main
        className={`c-article ${
          blocks.length === 1 ? 'c-longform-grid' : 'c-longform-grid-sub-div'
        }`}
      >
        <div className="contents">
          <ul className="contents__list">
            <h2>Table of contents</h2>
            {buildTitleObjects(content)
            .filter(({ children = [] }) => children)
            .map(item => (
              <li key={item.id} className="contents__list-item">
                <a href={`#${item.id}`}>{item.title}</a>
                {item.children && (
                  <ul className="contents__list">
                    {item.children.map(subitem => (
                      <li key={subitem.id} className="contents__list-item contents__list-subitem">
                        <a href={`#${subitem.id}`}>{subitem.title}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            { references &&
              <li key="references" className="contents__list-item">
                <a href="#references">References</a>
              </li>
            }
          </ul>
        </div>
        {abstract.length ? (
          <div className="c-longform-grid">
            <div className="c-longform-grid__standard">
              <h3>Abstract</h3>
              {typeof abstract === 'string' && <p>{abstract}</p>}
              {typeof abstract !== 'string' && (
                <BlockContent blocks={abstract} serializers={serializers(abstract)} />
              )}
            </div>
          </div>
        ) : null}
        {authors.length ? (
          <div className="c-longform-grid">
            <div className="c-longform-grid__standard">
              <h3>About the author{authors.length > 1 && 's'}</h3>
              {authors.map(({
                target: {
                  image = { asset: { url: '' } },
                  firstName = '',
                  surname = '',
                  position = '',
                  bioShort = [],
                } = {},
            }) => (
              <div>
                {image.asset.url && <img alt={`${firstName} ${surname}`} src={image.asset.url} />}
                <p>{firstName} {surname} <br />{position && position}</p>
                {bioShort &&
                  <BlockContent blocks={bioShort} serializers={serializers(bioShort)} />
                }
              </div>))}
            </div>
          </div>
        ) : null}

        {acknowledgements.length ? (
          <div className="c-longform-grid">
            <div className="c-longform-grid__standard">
              <h3>Acknowledgements</h3>
              {typeof acknowledgements === 'string' && <p>{acknowledgements}</p>}
              {typeof acknowledgements !== 'string' && (
                <BlockContent blocks={acknowledgements} serializers={serializers(acknowledgements)} />
              )}
            </div>
          </div>
        ) : null}

        <div className="body">
          <BlockContent blocks={blocks} serializers={serializers(blocks)} />
          {references ? (
            <div>
              <h2 id="references">References</h2>
              <BlockContent
                blocks={references}
                serializers={{
                  marks: {
                    link: props => <span>{props.children}. <a className="referencesLink" href={props.mark.href}>{props.mark.href}</a></span>,
                  },
                }}
              />
            </div>
          ) : null}
        </div>

        <Head>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        </Head>
      </main>
    );
  }
}

export default LongformArticle;
