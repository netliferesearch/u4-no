import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import { Provider } from 'react-redux';

import { initStore } from '../../../helpers/redux-store';
import { fetchAndMaterialize } from '../../../helpers/data-loader';
import { BreadCrumbV2 } from '../../../components/general/BreadCrumbV2';
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

const store = initStore();

const TopicArticleEntry = props => {
  const { url = {}, title, relatedUrl = {}, featuredImage = {}, advisors = [] } = props.data;
  const { query = {} } = url;
  const content = props.data.introduction;
  const headerData = {
    ...props.data,
    title: firstTitleInContent(content),
    lead: firstParagraphInContent(content),
  };
  return (
    <Provider store={store}>
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
              grandParentTitle={'Topics'}
              grandParentSlug={'/topics'}
              home={true}
            />
          </section>
          <hr className="u-section-underline--no-margins" />
          <section className="o-wrapper-medium">
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
                <ArticleActions data={props.data} />
                <AboutAuthor authors={advisors} />
                <Disclaimers title={true} />
              </div>
            </div>
          </section>
        </article>
        <Footer />
        <div id="modal" />
      </Layout>
    </Provider>
  );
};

TopicArticleEntry.propTypes = {
  data: PropTypes.object.isRequired,
};

TopicArticleEntry.defaultProps = {
  data: {
    url: {},
    title: '',
    introduction: '',
    slug: {},
  },
};

export default TopicArticleEntry;

const queryFunc = ({ params: { slug = '' } }) => ({
  sanityQuery: `*[slug.current == $slug && _type == "topics"][0]{title, longTitle, explainerText, slug, 
    introduction[]{'markDefs':markDefs[]{
      _type == 'internalReferance' => {_key,_type,"target": @->{_id,_type,title,slug}},
      _type != 'internalReferance' => {...},
    },...}, 
    relatedUrl, url, featuredImage, authors[]->{firstName, surname}}`,
  param: { slug },
});

export const getStaticProps = async ctx => {
  const { data, error = '' } = await fetchAndMaterialize({
    nextContext: ctx,
    queryFunc,
    materializeDepth: 1,
  });
  if (error === 'No content found (dataLoader said this)') {
    return { notFound: true };
  }
  return {
    props: { data },
    revalidate: 60,
  };
};

export const getStaticPaths = async ctx => {
  return {
    paths: [],
    fallback: true,
  };
};
