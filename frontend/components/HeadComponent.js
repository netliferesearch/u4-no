import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const HeadComponent = ({ title, description, image, preloadImage, url, ogp }) => (
  <Head>
    <meta charSet="utf-8" />
    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title>{title}</title>
    <meta name="description" content={description} />

    {preloadImage && (
      <link
        rel="preload"
        as="image"
        href={`${preloadImage}?auto=format&w=600&q=80&crop=focalpoint&fit=scale`}
        media="(max-width: 639px)"
      />
    )}
    {preloadImage && (
      <link
        rel="preload"
        as="image"
        href={`${preloadImage}?auto=format&w=1120&q=80&crop=focalpoint&fit=scale`}
        media="(min-width: 640px)"
      />
    )}
    <meta property="og:url" content={ogp.url ? ogp.url : url} />
    <meta property="og:type" content="article" />
    <meta property="og:title" content={ogp.title ? ogp.title : title} />
    <meta property="og:image" content={ogp.image ? ogp.image : image} />
    <meta property="og:description" content={ogp.description ? ogp.description : description} />
    <meta property="og:site_name" content="U4 Anti-Corruption Resource Centre" />
    <meta property="og:locale" content="en_US" />
    <meta name="google-site-verification" content="IuEUdfNVUT1nJ-DJUcrg99bbRIha348aLY0tC4tOIk0" />

    {/* Twitter will reuse OGP declarations for description and image */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@U4_ACRC" />
    <link rel="icon" type="image/png" href="/public/favicon.png" />

    <link
      href="https://fonts.googleapis.com/css?family=Lato:300,300i,400,400i,700,700i,900&display=swap"
      rel="stylesheet"
    />

    <script
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-KVW5J96');`,
      }}
    />
  </Head>
);

const basicMetaValidation = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  preloadImage: PropTypes.string,
};

HeadComponent.propTypes = {
  ...basicMetaValidation,
  url: PropTypes.string.isRequired,
  ogp: PropTypes.shape({ ...basicMetaValidation }),
};

HeadComponent.defaultProps = {
  title: 'U4 Anti-Corruption Resource Centre',
  description:
    'U4 translates anti-corruption research into practical advice for international development actors. We offer publications, training, workshops, helpdesk, and policy advice to government agencies and the global anti-corruption community.',
  image: '',
  preloadImage: '',
  ogp: {},
};

export default HeadComponent;
