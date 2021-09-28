import React from 'react';
import { connect, useSelector } from 'react-redux';
import ElasticDataLoader from '../helpers/elastic-data-loader';
import { updateSearchPageNum } from '../helpers/redux-store';
import Layout from '../components/Layout';
import Footer from '../components/general/footer/Footer';
import { SearchFieldV3 } from '../components/search/SearchFieldV3';
import { wrapInRedux } from '../helpers/redux-store-wrapper';
import { PageIntro } from '../components/general/PageIntro';
import { SearchResultsV3 } from '../components/search/SearchResultsV3';
import { bindActionCreators } from 'redux';
import SearchFiltersV3 from '../components/search/SearchFiltersV3';
import router, { useRouter } from 'next/router';
import { PostCarousel } from '../components/front-page/PostCarousel';

const Search = ({ data = {}, url = '' }) => {
  const router = useRouter();
  const showResults = useSelector(state => state.searchResultsVisible);
  const isPublicationsPage =
    router.query.filters && router.query.filters.search('publications-only');
  let publications = false;
  if (isPublicationsPage >= 0) {
    publications = true;
  }
  // console.log('publications', data);
  if (!data) return <div />;
  return (
    <Layout
      searchV2
      isSearchPage
      headComponentConfig={{
        title: 'Search',
        description: '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
      }}
      searchData={data}
    >
      <div className="c-search-page">
        {isPublicationsPage >= 0 ? (
          <div>
            <div className="o-wrapper-medium">
              <PageIntro title="Publications" text={'lorem ipsum'} />
            </div>
            {/* feratured publications section */}
            {/* 
            <section className="">
              <div className="o-wrapper-medium o-wrapper-mobile-full">
                <PostCarousel
                  posts={relatedResources}
                  type={POST_TYPE.BLOG}
                  buttonPath="/publications"
                  title="Related Content"
                  minPosts={3}
                />
                <hr className="u-section-underline--no-margins" />
              </div>
            </section> */}
            <hr className="u-section-underline--no-margins" />
            <div className="o-wrapper-medium">
              <h4 className="u-secondary-heading u-secondary-h1 u-detail--blue">Explore all</h4>
            </div>
          </div>
        ) : (
          <div>
            <div className="o-wrapper-medium">
              <PageIntro title="Search" text={'Browse the U4 site.'} />
            </div>
            <hr className="u-section-underline--no-margins" />
            <div className="o-wrapper-medium">
              <div className="c-menu__search-holder">
                <SearchFieldV3 isOpen={true} isAlwaysOpen={true} searchData={data} />
              </div>
            </div>
            <hr className="u-section-underline--no-margins" />
          </div>
        )}

        {showResults && (
          <div className="o-wrapper-medium">
            <div className="c-search-page__sections">
              <section className="o-layout__item u-12/12 u-3/12@desktop">
                <SearchFiltersV3 data={data} />
              </section>
              <section className="o-layout__item u-12/12 u-8/12@desktop u-push-1/12@desktop">
                <SearchResultsV3 data={data} publications={publications} />
              </section>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </Layout>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  updateSearchPageNum: bindActionCreators(updateSearchPageNum, dispatch),
});
export default wrapInRedux(
  ElasticDataLoader(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Search)
  )
);
