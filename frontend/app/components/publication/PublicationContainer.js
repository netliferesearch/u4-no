import { ArticleHeader } from '../article/ArticleHeader';
import { BreadCrumbV2 } from 'components/general/BreadCrumbV2';
import { PUBLICATIONS } from 'helpers/constants';
import { PostCarousel } from 'components/front-page/PostCarousel';
import { POST_TYPE } from 'components/general/post/Post';
import { PublicationAdditionalInfo } from './PublicationAdditionalInfo';

export default function PublicationContainer (props = {}) {
  const {
    data: {
      _type = '',
      title = '',
      lead = '',
      standfirst = '',
      slug = '',
      reference = '',
      featuredImage = {},
      relatedUrl = {},
      legacypdf = {},
      pdfThumbnail = {},
      recommendedResources = [],
    } = {},
    shortversion = false,
    isArticleMenuOpen,
    showLoadingScreen,
    url = {},
    children = {},
    publicationContentComponent = {},
    articleSidebarComponent = {},
  } = props;

  return (
    <>
      <article className="c-publication-container c-article-v2">
        <span id="js-top" />
        <section id="js-scroll-trigger" className="o-wrapper-medium">
          {_type === 'publication' ? (
            <BreadCrumbV2 home={true} title="Publications" parentSlug={PUBLICATIONS} />
          ) : null}
          <ArticleHeader
            data={props.data}
          />
        </section>

        <hr className="u-section-underline--no-margins" />

        <section
          className="o-wrapper-medium o-wrapper-mobile-full"
          style={{ display: 'block' }}
        >
          {_type === 'publication' && !shortversion && (
            <div className="c-article__row">
              <div className="content c-article__col">
                {publicationContentComponent}
              </div>
              <div className="c-article__side c-article__col">
                {articleSidebarComponent}
              </div>
            </div>
          )}
        </section>

        <PublicationAdditionalInfo data={props.data} />

        <span id="js-bottom" />
      </article>
      {recommendedResources &&
        <section className="">
          <div className="o-wrapper-medium o-wrapper-mobile-full">
            <PostCarousel
              posts={recommendedResources}
              type={POST_TYPE.BLOG}
              buttonPath="/publications"
              title="Related Content"
              minPosts={3}
            />
            <hr className="u-section-underline--no-margins" />
          </div>
        </section>
      }
      <div id="modal" />
    </>
  );
};