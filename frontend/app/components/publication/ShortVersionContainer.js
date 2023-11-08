import { BreadCrumbV2 } from 'components/general/BreadCrumbV2';
import LongformArticle from './LongformArticle';
import { PUBLICATIONS } from 'helpers/constants';
import { PostCarousel } from 'components/front-page/PostCarousel';
import { POST_TYPE } from 'components/general/post/Post';

export default function ShortVersionContainer( props = {} ) {
  const {
    data: {
      title = '',
      slug = '',
      recommendedResources = [],
    } = {},
    children = {}
  } = props;
  return (
    <>
      <article className="c-publication-container c-article-v2">
        <span id="js-top" />

        <section className="c-article--shortversion ">
          <div className="o-wrapper-medium">
            <BreadCrumbV2
              home={true}
              title={title}
              parentSlug={`/publications/${slug.current}`}
            />
          </div>
          <div className="o-wrapper-medium">
            <div className="c-article__row">
              <div className="content c-article__col">
                {children}
              </div>
            </div>
          </div>
        </section>

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