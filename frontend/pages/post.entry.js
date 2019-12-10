import React from 'react';
import dateToString from '../helpers/dateToString';
import { Link } from '../routes';
import DataLoader from '../helpers/data-loader';
import BlockContent from '@sanity/block-content-to-react';
import { Layout } from '../components';
import serializers from '../components/serializers';

const PostPage = ({ data: { post = {} }, url = {} }) => {
  const {
    title = '',
    date = {},
    featuredImage = {},
    lead = '',
    standfirst = '',
    content = [],
    topics = [],
    keywords = [],
  } = post;
  return (
    <Layout
      headComponentConfig={{
        title,
        description: lead,
        image: featuredImage.asset && featuredImage.asset.url ? featuredImage.asset.url : '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
        ogp: {},
      }}
    >
      <div className="c-oneColumnBox c-oneColumnBox__darkOnWhite">
        <div className="o-wrapper-inner u-margin-top u-margin-bottom-large">
          <div>
            <p className="c-longform-grid__standard">
              <a href="/search?filters=publications-only%2Cpub-U4%20Blog%20post&sort=year-desc">
                All blog posts
              </a>
            </p>
            <h2 className="c-longform-grid__standard">{title}</h2>
            {date && (
              <p className="c-longform-grid__standard">
                {dateToString({ start: date.utc, format: 'D MMMM, YYYY' })}
              </p>
            )}
            {lead && <p className="c-longform-grid__standard">{lead}</p>}
            {standfirst && <p className="c-longform-grid__standard">{standfirst}</p>}
            {featuredImage && <img src={`${featuredImage}?w=940&fit=max`} alt="Featured image" />}
          </div>
          {content ? <BlockContent blocks={content} serializers={serializers} /> : null}

          {topics.length > 0 && (
            <p className="c-longform-grid__standard">
              Related topics:{' '}
              {topics.map(({ _ref = '', target = {} }) => (
                <Link
                  key={_ref}
                  route="topic.entry"
                  params={{ slug: target.slug ? target.slug.current : '' }}
                >
                  <a className="c-article-header__link-item">{target.title}</a>
                </Link>
              ))}
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DataLoader(PostPage, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
       "post": *[_type=="blog-post" && slug.current == $slug][0]{title, date, content, "slug": slug.current, topics, keywords, lead, standfirst, lead,  _id, "featuredImage": featuredImage.asset->url}}`,
    param: { slug },
  }),
  materializeDepth: 5,
});
