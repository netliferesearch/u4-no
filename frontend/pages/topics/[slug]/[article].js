import React from 'react';
import find from 'lodash/find';
import { useRouter } from 'next/router';

import DataLoader from '../../../helpers/data-loader';
import { wrapInRedux } from '../../../helpers/redux-store-wrapper';
import { BreadCrumbV2 } from '../../../components/general/BreadCrumbV2';
import { ArticleHeader } from '../../../components/general/article-header/ArticleHeader';
import LongformArticle from '../../../components/LongformArticle';
import { ArticleSidebar } from '../../../components/general/article-sidebar/ArticleSidebar';
import Layout from '../../../components/Layout';
import Footer from '../../../components/general/footer/Footer';
import { ArticleActions } from '../../../components/general/article-actions/ArticleActions';
import { AboutAuthor } from '../../../components/blog/AboutAuthor';
import { Disclaimers } from '../../../components/general/disclaimers/Disclaimers';

const firstTitleInContent = (content = []) => {
  const firstTitle = find(content, ({ style = '' }) => style === 'h1' || style === 'h2');
  return firstTitle ? firstTitle.children[0].text : '';
};

const firstParagraphInContent = (content = []) => {
  const firstParagraph = find(content, ({ style = '' }) => style === 'normal');
  return firstParagraph ? firstParagraph.children[0].text : '';
};

const TopicArticleEntry = props => {
  const { url = {}, title, lead = {}, relatedUrl = {}, featuredImage = {}, advisors = [] } = props.data;
  const { query = {} } = url;
  const topicPartMap = {
    basics: 'introduction',
    agenda: 'agenda',
  };
  const router = useRouter();
  const content =
    props.data[topicPartMap[router.asPath.split('/')[router.asPath.split('/').length - 1]]];
  const headerData = {
    ...props.data,
    title: firstTitleInContent(content),
    lead: firstParagraphInContent(content),
  };
  return (
    <Layout
      headComponentConfig={{
        title,
        description: firstParagraphInContent(content),
        image: featuredImage.asset && featuredImage.asset.url ? featuredImage.asset.url : '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
        ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
      }}
    >
      <article className="c-publication-container c-article-v2">
        <section className="o-wrapper-medium">
          <BreadCrumbV2
            title={title}
            parentSlug={'/topics/' + props.data.slug.current}
            currentTitle={firstTitleInContent(content)}
            home={true}
          />
          <ArticleHeader data={headerData} />
        </section>
        <hr className="u-section-underline--no-margins" />
        <section className="o-wrapper-medium o-wrapper-mobile-full">
          <div className="c-article__row">
            <div className="content c-article__col">
              <LongformArticle content={content} title={title} />
            </div>
            <div className="c-article__side c-article__col">
              <ArticleSidebar data={props.data} />
            </div>
          </div>
        </section>
        <section className="u-bg--lighter-blue c-article__additional-content">
            <div className="o-wrapper-medium">
              <div className="o-wrapper-narrow">
                <ArticleActions data={props.data}/>
                <AboutAuthor authors={advisors} />
                <Disclaimers title={true} />
                {/* {keywords.length > 0 ? (
                  <Keywords title={true} keywords={keywords} hr={true} />
                ) : null} */}
              </div>
            </div>
          </section>
      </article>
      <Footer />
      <div id="modal" />
    </Layout>
  );
};
 
export default wrapInRedux(
  DataLoader(TopicArticleEntry, {
    queryFunc: ({ query: { slug = '' } }) => ({
      sanityQuery: '*[slug.current == $slug && _type == "topics"][0]{...,authors[]->{firstName, surname}}',
      param: { slug },
    }),
    materializeDepth: 1,
  })
);
