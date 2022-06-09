import React from 'react';
import dynamic from 'next/dynamic';

import { Provider } from 'react-redux';
import { initStore } from '../helpers/redux-store';

import { fetchAndMaterialize } from '../helpers/data-loader';
//import LongformArticleContainer from '../components/LongformArticleContainer';
import Footer from '../components/general/footer/Footer';
import Layout from '../components/Layout';
//import ServiceArticle from '../components/ServiceArticle';
//import SimpleHero from '../components/SimpleHero';
import { PageIntro } from '../components/general/PageIntro';
//import ArticleContainer from '../components/article/ArticleContainer';

const ServiceArticle = dynamic(() =>
  import('../components/ServiceArticle')
);

const ArticleContainer = dynamic(() =>
  import('../components/article/ArticleContainer')
);

const store = initStore();

const FrontPage = props => {
  const {
    title = '',
    longTitle = '',
    featuredImage = {},
    lead = '',
    sections,
    relatedUrl = {},
    explainerText = '',
  } = props.data;
  const { url = {} } = props;

  return (
    <Layout
      headComponentConfig={{
        title,
        description: lead,
        image: featuredImage.asset && featuredImage.asset.url ? featuredImage.asset.url : '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
        ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
      }}
    >
      {/* {lead && <SimpleHero light title={title} content={lead} />} */}
      {lead || (title && <PageIntro title={title} text={lead ? lead : ''} />)}
      {sections ? <ServiceArticle blocks={sections} /> : null}
      <Footer />
    </Layout>
  )
}

const GeneralArticle = props => {
  return (
    <Provider store={store}>
      {props.data && props.data._type === 'frontpage' ? (
        <FrontPage {...props} />
      ) : (
        <ArticleContainer {...props} />
      )}
    </Provider>
  );
}

export default GeneralArticle;

const queryFunc = ({ params: { slug = '' } }) => ({
  sanityQuery: `*[slug.current == $slug][0]{..., topics[]->{ _id, title, slug }, 
    "articleType": articleType[0]->title,
    "recommendedResources": relatedContent[]->{ _type, _id, title, slug, 
      publicationType->{ title }, 
      "articleTypeTitle": articleType[0]->title, 
      publicationNumber, date, reference, "imageUrl": featuredImage.asset->url },
  }`,
  param: { slug },
});

export const getStaticProps = async ctx => {
  const { data, error = '' } = await fetchAndMaterialize({
    nextContext: ctx,
    queryFunc,
    materializeDepth: 2,
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
