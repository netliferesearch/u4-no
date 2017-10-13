/*
  custom error handling
  source: https://github.com/zeit/next.js#custom-error-handling
  if redirect found then redirect else error
*/

import React from 'react';
import sanityClient from '@sanity/client';

/* send 301 Permanent redirect to path */
function redirectPermanent(ctx, path) {
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: path });
    ctx.res.end();
  } else {
    document.location.pathname = path;
  }
}

export default class Error extends React.Component {
  static async getInitialProps(ctx) {
    const redirects = [
      { from: '/publications-2-fr-FR', to: '/publications' },
      { from: '/publications-2-es-ES', to: '/publications' },
      { from: /\/publications\/([^/]+)\/downloadasset\/([^/]*)/i, to: '/publications/$1/pdf' },
      { from: '/themes/corruption-and-aid', to: '/topics/development-cooperation' },
      { from: '/themes/evaluation-and-measurement', to: '/topics/' },
      { from: '/themes/anti-corruption-agencies', to: '/topics' },
      { from: '/themes/international-drivers-of-corruption', to: '/topics' },
      { from: '/themes/justice-sector', to: '/topics' },
      { from: '/themes/fragile-states', to: '/topics' },
      { from: '/themes/natural-resource-management', to: '/topics' },
      { from: '/themes/un-convention-against-corruption', to: '/topics' },
      { from: '/themes/education-sector', to: '/topics' },
      { from: '/themes/anti-corruption-approaches-in-sector-work', to: '/topics' },
      { from: '/themes/health-sector', to: '/topics' },
      { from: '/themes/public-financial-management-and-procurement', to: '/topics' },
      { from: '/themes/people-s-engagement', to: '/topics' },
      { from: '/themes/redd-integrity', to: '/topics' },
      { from: '/themes/money-in-politics', to: '/topics' },
      { from: '/themes/ethics', to: '/topics' },
      { from: '/themes/private-sector', to: '/topics' },
      { from: '/themes/corruption-in-emergencies', to: '/topics' },
      { from: '/themes/natural-resources', to: '/topics' },
      { from: '/themes/aacc', to: '/topics' },
      { from: '/themes/pfm', to: '/topics' },
      { from: '/themes/monitoring-aid', to: '/topics' },
      { from: '/themes/nrm', to: '/topics' },
      { from: '/themes/justice', to: '/topics' },
      { from: '/themes/aacc', to: '/topics' },
      { from: '/themes/procurement', to: '/topics' },
      { from: '/themes', to: '/topics' },
      { from: '/recommended-reading/', to: '/articles' },
      { from: '/info/', to: '/about' },
      { from: '/training/', to: '/training' },
      { from: '/articles/', to: '/' },
      { from: '/home/', to: '/' },
      { from: '/your-partner-profile/', to: '/' },
      { from: '/document/', to: '/' },
      { from: '/glossary', to: '/' },
      { from: '/glossaire', to: '/' },
      { from: '/projects', to: '/' },
      { from: '/u4-centre-de-ressources-anti-corruption/', to: '/' },
      { from: '/formation', to: '/' },
      { from: '/helpdesk-help', to: '/helpdesk' },
      { from: '/articles-fr-FR', to: '/' },
      { from: '/themes-es-ES', to: '/topics' },
      { from: '/info-fr', to: '/' },
      { from: '/conseils-de-lecture', to: '/' },
      { from: '/helpdesk-fr-FR/', to: '/helpdesk' },
      { from: '/', to: '/' },
      { from: '/', to: '/' },
    ];
    const redir = redirects.find(({ from }) => ctx.asPath.match(from));
    if (redir) {
      return redirectPermanent(ctx, ctx.asPath.replace(redir.from, redir.to));
    }

    const client = sanityClient({
      projectId: '1f1lcoov',
      dataset: 'production',
      token: '',
      useCdn: false,
    });

    const queryFunc = () => ({
      sanityQuery: '{ "publications": *[_type in ["publication"]][0..1] }',
    });

    const { sanityQuery, param } = queryFunc(ctx);
    const sanityResults = await client.fetch(sanityQuery, param);

    return { sanityResults };
  }

  render() {
    return (
      <p>
        {this.props.statusCode
          ? `An error ${this.props.statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    );
  }
}
