import React from 'react';
import DataLoaderPreview from '../../../helpers/data-loader-preview';
//import LongformArticleContainer from '../components/LongformArticleContainer';
import Footer from '../../../components/general/footer/Footer';
import Layout from '../../../components/Layout';
import ServiceArticle from '../../../components/ServiceArticle';
//import SimpleHero from '../components/SimpleHero';
import { wrapInRedux } from '../../../helpers/redux-store-wrapper';
import { PageIntro } from '../../../components/general/PageIntro';
import ArticleContainer from '../../../components/article/ArticleContainer';

const GeneralArticle = props => {
  if (props.data._type === 'frontpage') {
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
    );
  }
  //return <LongformArticleContainer lead={props.data.standfirst} {...props} />;
  return <ArticleContainer {...props} />;
};

export default wrapInRedux(
  DataLoaderPreview(GeneralArticle, {
    queryFunc: ({ query: { id = '' } }) => ({
      sanityQuery: '*[_id == $id][0]{..., topics[]->{ _id, title, slug }, "articleType": articleType[0]->title }',
      param: { id },
    }),
    materializeDepth: 2,
  })
);
