import React from 'react';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';

import Image from 'next/image';
import sanityImageLoader from '../../../components/sanityImageLoader';

import DataLoader from '../../../helpers/data-loader';
import slugify from 'slugify';
import serializers from '../../../components/serializers';

import Footer from '../../../components/general/footer/Footer';
import Layout from '../../../components/Layout';
import Team from '../../../components/Team';
import Mosaic from '../../../components/Mosaic';
import PartnerPromo from '../../../components/PartnerPromo';
import LinkList from '../../../components/general/LinkList';

import BasicGuide from '../../../components/icons/BasicGuide';
import ResearchAgenda from '../../../components/icons/ResearchAgenda';
import ArrowRight from '../../../components/icons/ArrowRight';

import LinkBox from '../../../components/LinkBox';

const TopicEntry = ({
  data: {
    topic: {
      title = '',
      longTitle = '',
      explainerText = '',
      featuredImage,
      relatedTopics = [],
      parent = {},
      slug = {},
      introduction = [],
      agenda = [],
      advisors = [],
      resources = [],
      relatedUrl = {},
      _id = '',
      _type = '',
      url = {},
    } = {},
  },
}) => (
  <Layout
    headComponentConfig={Object.assign(
      {
        title,
        description: explainerText,
        image: featuredImage && featuredImage.asset ? featuredImage.asset.url : '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
        ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
      },
      relatedUrl
    )}
  >
    <div>
      <h1
        id={slugify(title, { lower: true, remove: /[$*_+~.()'"!\-:@]/g })}
        className="c-topic-page_title"
      >
        {title}
      </h1>
      <h2
        id={slugify(longTitle, { lower: true, remove: /[$*_+~.()'"!\-:@]/g })}
        className="c-topic-page__longTitle"
      >
        {longTitle}
      </h2>

      <section className="c-boxOnImage u-margin-bottom-huge">
        {featuredImage ? (
          <figure className="c-boxOnImage__figure">
            <Image
              loader={sanityImageLoader}
              src={featuredImage.asset.url}
              alt={featuredImage.asset.altText ? featuredImage.asset.altText : ''}
              layout="fill"
              objectFit="cover"
              priority="true"
            />

            <span className="c-boxOnImage__caption">
              {featuredImage.caption && (
                <BlockContent blocks={featuredImage.caption} serializers={serializers} />
              )}
              {featuredImage.sourceUrl && (
                <a href={featuredImage.sourceUrl}>
                  {featuredImage.credit ? featuredImage.credit : 'Credit'}
                </a>
              )}
              {!featuredImage.sourceUrl && featuredImage.credit && (
                <span>{featuredImage.credit}</span>
              )}
              {featuredImage.license && <span> {featuredImage.license.toUpperCase()}</span>}
            </span>
          </figure>
        ) : null}
        <div className="c-boxOnImage__body">
          <p>{explainerText}</p>
          {relatedTopics.length > 0 && <LinkList title="Related topics" content={relatedTopics} />}
        </div>
      </section>

      {introduction.length + agenda.length > 0 && (
        <div>
          <h2 className="c-topic-section__title c-topic-section__title--large">
            From basic guides to in-depth perspectives, all in one place.
          </h2>
          <section className="c-linkbox-wrapper">
            {introduction.length > 0 && (
              <LinkBox
                title="Basic guide"
                text={`Read our introduction to corruption and anti-corruption efforts in ${title.toLowerCase()}.`}
                icon={BasicGuide}
                _type="topicsBasics"
                slug={slug}
              />
            )}
            {agenda.length > 0 && (
              <LinkBox
                title="Research and policy agenda"
                text={`Discover what U4 and others do to advance research and reduce corruption in ${title.toLowerCase()}.`}
                icon={ResearchAgenda}
                _type="topicsAgenda"
                slug={slug}
              />
            )}
          </section>
        </div>
      )}
      {resources.length > 0 && (
        <div id="resources">
          <h2 className="c-topic-section__title">
            Inform your anti-corruption work with handpicked topic related publications, insights
            and ideas.
          </h2>

          <section className="c-topic-section u-padding-top-none">
            <div className="o-wrapper-medium">
              <Mosaic resources={resources} />
            </div>
            <h2 className="c-topic-section__cta">
              <a href={`/search?filters=topic-type-${encodeURI(title)}&search=`}>
                Explore all our resources &nbsp;
                <ArrowRight />
              </a>
            </h2>
          </section>
        </div>
      )}
    </div>

    {advisors.length > 0 && (
      <div id="advisors" className="c-topic-section--lightblue o-wrapper-full-width">
        {
          <Team
            title={
              advisors.length > 1
                ? 'We’re the team developing this topic.'
                : 'I’m developing this topic.'
            }
            members={advisors}
            linkLabel="Read full bio"
          />
        }
        <h2 className="c-topic-section__cta">
          <a href="/the-team">
            The whole U4 team &nbsp;
            <ArrowRight />
          </a>
        </h2>
      </div>
    )}

    {
      <div id="partners" className="c-topic-section">
        <PartnerPromo />
      </div>
    }
    <Footer />
  </Layout>
);

TopicEntry.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DataLoader(TopicEntry, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
      "topic": *[slug.current == $slug && _type=='topics']{
        ...,
        "featuredImage": {
          "caption": featuredImage.caption,
          "credit": featuredImage.credit,
          "sourceUrl": featuredImage.sourceUrl,
          "license": featuredImage.license,
          "asset": featuredImage.asset->{
            "altText": altText,
            "url": url
          }
        },
        "advisors": advisors[]->{
          _id,
          title,
          "image": image.asset->{"asset": { "url": url}},
          position,
          firstName,
          surname,
          email,
          slug,
          bio
        },
        "relatedTopics":
          *[_type == 'topics' && _id != ^._id && (_id==coalesce(^.parent._ref,^._id) || (parent._ref == coalesce(^.parent._ref,^._id)))]{
            _id,
            _type,
            title,
            "slug": slug.current,
          },
        "resources": resources[]->{
          _id,
          _type,
          "publicationType": publicationType->title,
          "articleType": articleType[0]->title,
          title,
          "slug": slug.current,
          "titleColor": featuredImage.asset->metadata.palette.dominant.title,
          "imageUrl": featuredImage.asset->url
        }
    }[0]}`,
    param: { slug },
  }),
  materializeDepth: 0,
});
