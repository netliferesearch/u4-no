import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import stylesheet from '../style/main.scss';

const HeadComponent = ({
  title, description, image, url, ogp,
}) => (
  <Head>
    <meta charSet="utf-8" />
    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title>{title}</title>
    <meta name="description" content={description} />

    <meta property="og:url" content={ogp.url ? ogp.url : url} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={ogp.title ? ogp.title : title} />
    <meta property="og:image" content={ogp.image ? ogp.image : image} />
    <meta property="og:description" content={ogp.description ? ogp.description : description} />
    <meta property="og:site_name" content="U4 Anti-Corruption Resource Centre" />
    <meta property="og:locale" content="en_US" />

    {/* Twitter will reuse OGP declarations for description and image */}
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@U4_ACRC" />
    <link rel="icon" type="image/png" href="/static/favicon.png" />

    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <div
      dangerouslySetInnerHTML={{
        __html: `<!--[if IE]>
                  <style>
                      .c-longform-grid {
                        max-width: 620px !important;
                      }
                  </style>
                <![endif]-->`,
      }}
    />
  </Head>
);

const basicMetaValidation = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

HeadComponent.propTypes = {
  ...basicMetaValidation,
  url: PropTypes.string.isRequired,
  ogp: PropTypes.shape({ ...basicMetaValidation }),
};

HeadComponent.defaultProps = {
  title: '',
  description:
    'U4 translates anti-corruption research into practical advice for international development actors. We offer publications, training, workshops, helpdesk, and policy advice to government agencies and the global anti-corruption community.',
  image: '',
  ogp: {},
};

export default HeadComponent;
