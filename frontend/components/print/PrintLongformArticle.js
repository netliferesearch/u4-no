/* eslint-disable react/no-danger */
import React, { PureComponent } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import Head from 'next/head';
import BEMHelper from 'react-bem-helper';
import stylesheet from '../../style/print.scss';
import serializers from '../printSerializers';
import buildTitleObjects from '../TableOfContents/buildTitleObjects';
import { CreativecommonsCC, CreativecommonsBY, CreativecommonsNC, CreativecommonsND } from '../icons';

const classes = BEMHelper({
  name: 'longform-grid',
  prefix: 'c-',
});

/**
 * Here we replace Sanity's react components for rendering basic things like
 * lists so that we can drop in our classnames
 * @type {Object}
 */

class LongformArticle extends PureComponent {
  render() {
    const { content = [] } = this.props;
    const blocks = content.filter(block => !['reference'].includes(block._type));
    return (
      <main
        className={`c-article ${blocks.length === 1 ? 'c-longform-grid' : 'c-longform-grid-sub-div'}`}
      >
        <div className="page2">
          <h2>Partners in this publication</h2>
          {this.props.partners.map(partner =>
            <img src={partner.institution.logo.asset.url} />)
          }
          <h2>Acknowledgments</h2>
          <p>{this.props.acknowledgements}</p>
          <h2>Publisher</h2>
          <p>U4 Anti-Corruption Resource Centre, Chr. Michelsen Institute, Bergen, Norway.</p>
          <h2>Disclaimer</h2>
          <p>All views in this text are the author(s)’, and may differ from the U4 partner agencies’ policies.</p>
          <h2>U4 partner agencies</h2>
          <p>The U4 Anti-Corruption Resource Centre is an institutional partnership of bilateral international development agencies/ministries of foreign affairs: Australian Government – Department of Foreign Affairs and Trade, Danida – Ministry of Foreign Affairs of Denmark, Ministry for Foreign Affairs of Finland, Germany – Federal Ministry for Economic Cooperation and Development and GIZ, Norad – The Norwegian Agency for Development Cooperation, Sida – Swedish International Development Cooperation Agency, Switzerland – Swiss Agency for Development and Cooperation, UK Aid – Department for International Development.</p>
          <h2>About U4</h2>
          <p>At U4, we work to reduce the harmful impact of corruption on society. We share research and evidence to help international development actors get sustainable results. U4 is a permanent centre at the Chr. Michelsen Institute (CMI) in Norway. CMI is a non-profit, multi-disciplinary research institute with social scientists specialising in development studies.</p>
          <h2>Cover photo</h2>
          <p>{this.props.featuredImage.caption.map(caption => caption.children[0].text)} {this.props.featuredImage.credit} {this.props.featuredImage.sourceUrl} <br />
          CIFOR CC BY-NC-SA</p>
          <h2>Creative commons</h2>
          <p><CreativecommonsCC className="page2-ccimage" />
            <CreativecommonsBY className="page2-ccimage" />
            <CreativecommonsNC className="page2-ccimage" />
            <CreativecommonsND className="page2-ccimage" /><br />
          CC BY-NC-ND 4.0</p>
          <h2>Online version</h2>
          <p>{this.props.relatedUrl.url}</p>
        </div>
        <div className="contents">
          <ul className="contents__list" >
            <h2>Table of contents</h2>
            {
              buildTitleObjects(content).map(item => (<li className="contents__list-item" ><a href={`#${item.id}`}>{item.title}</a>
                {item.children &&
                <ul className="contents__list">
                  {item.children.map(subitem => <li className="contents__list-item contents__list-subitem"><a href={`#${subitem.id}`}>{subitem.title}</a></li>)}
                </ul>
                }</li>))
            }
          </ul>
        </div>
        <div className="body">
          <BlockContent blocks={blocks} serializers={serializers} />
        </div>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        </Head>
      </main>
    );
  }
}


export default LongformArticle;
