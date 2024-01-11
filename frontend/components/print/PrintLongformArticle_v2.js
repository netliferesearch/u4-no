/* eslint-disable react/no-danger */
import React, { PureComponent } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import serializers from './printSerializers';
import buildTitleObjects from '../TableOfContents/buildTitleObjects';
import { translate, translateField, langCode } from '../../helpers/translate';
import { Classnames } from 'react-alice-carousel';

/**
 * Here we replace Sanity's react components for rendering basic things like
 * lists so that we can drop in our classnames
 * @type {Object}
 */

class LongformArticle extends PureComponent {
  render() {
    const {
      content = [],
      abstract = [],
      notes = [],
      authors = [],
      acknowledgements = [],
      abbreviations = [],
      editors = [],
      references = [],
      methodology = [],
      language = 'en',
    } = this.props;

    const lang = langCode(language);
    const trans = translate(language);
    const transField = translateField(language);

    const blocks = content.filter((block = {}) => block && !['reference'].includes(block._type));
    return (
      <main className='main-content'>
        <div className="table-of-contents">
          <div className='page-heading'>{trans('table_of_contents')}</div>
          <ul className="toc-list">
            {buildTitleObjects(content)
              .filter(({ children = [] }) => children)
              .map(item => (
                <li key={item.id} className="toc-list-item">
                  <a href={`#${item.id}`}>{item.title}</a>
                  {item.children && (
                    <ul className="toc-list">
                      {item.children.map(subitem => (
                        <li key={subitem.id} className="toc-list-item toc-list-subitem">
                          <a href={`#${subitem.id}`}>{subitem.title}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            {false && methodology.length > 0 && (
              <li key="references" className="toc-list-item">
                <a href="#methodology">{trans('methodology')}</a>
              </li>
            )}
            {references.length > 0 && (
              <li key="references" className="toc-list-item">
                <a href="#references">{trans('references')}</a>
              </li>
            )}
          </ul>
        </div>

        {abstract.length ? (
          <div className="front-matter-page">
            <div className='page-heading'>{trans('abstract')}</div>
            <div className="two-columns">
              {typeof abstract === 'string' && <p>{abstract}</p>}
              {typeof abstract !== 'string' && (
                <BlockContent blocks={abstract} serializers={serializers(abstract)} />
              )}
            </div>
          </div>
        ) : null}

        {abbreviations.length ? (
          <div className="front-matter-page">
            <div className='page-heading'>{trans('abbreviations')}</div>
            <div className="c-longform-grid__standard abbreviations">
              {typeof abbreviations === 'string' && <p>{abbreviations}</p>}
              {typeof abbreviations !== 'string' && (
                <BlockContent blocks={abbreviations} serializers={serializers(abbreviations)} />
              )}
            </div>
          </div>
        ) : null}


        <div className="publication-body">
          <BlockContent
            blocks={blocks}
            serializers={serializers(blocks)}
            renderContainerOnSingleChild={false}
          />
        </div>

          {false && methodology.length > 0 ? (
          <div className="front-matter-page">
            <div className='page-heading' id="methodology">{trans('methodology')}</div>
            <div className='two-columns'>
              <BlockContent
                blocks={methodology}
                serializers={{
                  marks: {
                    link: props => (
                      <span>
                        {props.children}.{' '}
                        <a className="referencesLink" href={props.mark.href}>
                          {props.mark.href}
                        </a>
                      </span>
                    ),
                  },
                }}
              />
              </div>
            </div>
          ) : null}
          {references.length > 0 ? (
            <div className="front-matter-page">
              <div className='page-heading' id="references">{trans('references')}</div>
              <div className='two-columns references'>
              <BlockContent
                blocks={references}
                serializers={{
                  marks: {
                    link: props => (
                      <span>
                        <a className="referencesLink inlineLink" href={props.mark.href}>
                          {props.children}
                        </a>
                      </span>
                    ),
                  },
                }}
              />
              </div>
            </div>
          ) : null}

        {authors.length ? (
          <div className="front-matter-page">
            <div className='page-heading'>{authors.length > 1 ? trans('about_the_authors') : trans('about_the_author')}</div>
            <div className="two-columns">
              {authors
                .map(author => (author.target ? author.target : author))
                .map((person, index) => (
                  <div key={person._id} className="about-the-author">
                    {person.image && person.image.asset && person.image.asset.url && (
                      <img
                        alt={`${transField(person, 'firstName')} ${transField(person, 'surname')}`}
                        src={person.image.asset.url}
                      />
                    )}
                    <p>
                      <b>
                        {transField(person, 'firstName')} {transField(person, 'surname')}
                      </b>
                      {!(person.bioShort && person.bioShort.length) && person.position ? (
                        <span>
                          <br />
                          {transField(person, 'position')}
                        </span>
                      ) : null}
                    </p>
                    {person.bioShort && person.bioShort.length && (
                      <BlockContent
                        blocks={transField(person, 'bioShort')}
                        serializers={serializers(transField(person, 'bioShort'))}
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        ) : null}

        {acknowledgements.length ? (
          <div className="front-matter-page">
            <div className='page-heading'>{trans('acknowledgements')}</div>
            <div className="two-columns">
              {typeof acknowledgements === 'string' && <p>{acknowledgements}</p>}
              {typeof acknowledgements !== 'string' && (
                <BlockContent
                  blocks={acknowledgements}
                  serializers={serializers(acknowledgements)}
                />
              )}
            </div>
          </div>
        ) : null}

      </main>
    );
  }
}

export default LongformArticle;
