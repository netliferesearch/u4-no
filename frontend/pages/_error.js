/*
  custom error handling
  source: https://github.com/zeit/next.js#custom-error-handling
  if redirect found then redirect else error
*/

import React from 'react';
import { Layout, Footer } from '../components';

/* send 301 Permanent redirect to path */
function redirectPermanent(ctx, path) {
  if (ctx.res) {
    ctx.res.writeHead(301, { Location: path });
    ctx.res.end();
  } else {
    document.location.pathname = path;
  }
}

export default class Error extends React.Component {
  static async getInitialProps(ctx) {
    const redirects = [
      { from: '/publications', to: '/search?filters=pub-type-0&search=%2A' },
      {
        from: '/publications-2-fr-FR',
        to: '/search?filters=pub-type-0%2Cpub-lang-fr_FR&search=%2A',
      },
      {
        from: '/publications-2-es-ES',
        to: '/search?filters=pub-type-0%2Cpub-lang-es_ES&search=%2A',
      },
      { from: /\/publications\/([^/]+)\/downloadasset\/([^/]*)/i, to: '/publications/$1/pdf' },
      { from: '/themes/corruption-and-aid', to: '/topics/development-cooperation' },
      { from: '/themes/evaluation-and-measurement', to: '/topics/evaluation-and-measurement' },
      { from: '/themes/anti-corruption-agencies', to: '/topics' },
      {
        from: '/themes/international-drivers-of-corruption',
        to: '/topics/international-drivers-of-corruption',
      },
      { from: '/themes/justice-sector', to: '/topics/justice-sector' },
      { from: '/themes/fragile-states', to: '/topics' },
      { from: '/themes/natural-resource-management', to: '/topics/natural-resources-and-energy' },
      { from: '/themes/un-convention-against-corruption', to: '/topics' },
      { from: '/themes/education-sector', to: '/topics/basic-services' },
      { from: '/themes/anti-corruption-approaches-in-sector-work', to: '/topics' },
      { from: '/themes/health-sector', to: '/topics/basic-services' },
      {
        from: '/themes/public-financial-management-and-procurement',
        to: '/topics/public-financial-management',
      },
      { from: '/themes/people-s-engagement', to: '/topics/people-s-engagement-1' },
      { from: '/themes/redd-integrity', to: '/topics' },
      { from: '/themes/money-in-politics', to: '/topics' },
      { from: '/themes/ethics', to: '/topics' },
      { from: '/themes/private-sector', to: '/topics/private-sector' },
      { from: '/themes/corruption-in-emergencies', to: '/topics' },
      { from: '/themes/natural-resources', to: '/topics/natural-resources-and-energy' },
      { from: '/themes/aacc', to: '/topics' },
      { from: '/themes/pfm', to: '/topics/public-financial-management' },
      { from: '/themes/monitoring-aid', to: '/topics/development-cooperation' },
      { from: '/themes/nrm', to: '/topics/natural-resources-and-energy' },
      { from: '/themes/justice', to: '/topics/justice-sector' },
      { from: '/themes/aacc', to: '/topics' },
      { from: '/themes/procurement', to: '/topics/public-financial-management' },
      { from: '/themes', to: '/topics' },
      { from: '/recommended-reading/', to: '/articles' },
      { from: '/info/', to: '/about' },
      { from: '/training/', to: '/online-courses' },
      { from: '/articles/', to: '/' },
      { from: '/home/', to: '/' },
      { from: '/your-partner-profile/', to: '/' },
      { from: '/document/', to: '/' },
      { from: '/glossaire', to: '/terms' },
      { from: '/glossary', to: '/terms' },
      { from: '/projects', to: '/' },
      { from: '/u4-centre-de-ressources-anti-corruption/', to: '/' },
      { from: '/formation', to: '/online-courses' },
      { from: '/helpdesk-help', to: '/helpdesk' },
      { from: '/articles-fr-FR', to: '/' },
      { from: '/themes-es-ES', to: '/topics' },
      { from: '/info-fr', to: '/' },
      { from: '/conseils-de-lecture', to: '/' },
      { from: '/helpdesk-fr-FR/', to: '/helpdesk' },
    ];
    const redir = redirects.find(({ from }) => ctx.asPath.match(from));
    if (!process.env.NODE_ENV === 'DEV' && redir) {
      return redirectPermanent(ctx, ctx.asPath.replace(redir.from, redir.to));
    }
    /* TODO: make some query based on requested url to display suggested content
    const client = sanityClient({
      projectId: '1f1lcoov',
      dataset: 'production',
      token: '',
      useCdn: false,
    });

    const queryFunc = () => ({
      sanityQuery: '{ "suggestions": *[_type in ["publication"]] }',
    });

    const { sanityQuery, param } = queryFunc(ctx);
    const sanityResults = await client.fetch(sanityQuery, param);

    return { sanityResults };
  */
    return {};
  }

  render() {
    return (
      <Layout
        headComponentConfig={{
          title: 'Page not found',
          description: '',
          image: '',
          url: '',
          ogp: {},
        }}
      >
        <div className="c-oneColumnBox c-oneColumnBox__darkOnWhite">
          <div className="o-wrapper-inner u-margin-top u-margin-bottom-large">
            <div>
              <h2 className="c-longform-grid__standard">Page not found</h2>
              <p className="c-longform-grid__standard">
                Sorry about that! We have recently upgraded our website, so some content has been
                discontinued.
              </p>
              <p>
                {this.props.statusCode
                  ? `Page not found: ${this.props.statusCode} occurred on server`
                  : 'Page not found error occurred on client'}
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </Layout>
    );
  }
}
