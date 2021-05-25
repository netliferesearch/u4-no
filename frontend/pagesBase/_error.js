/*
  custom error handling
  source: https://github.com/zeit/next.js#custom-error-handling
  if redirect found then redirect else error
*/

import React from 'react';
import { Error404 } from '../components';
import { redirectPermanent, getRedirect } from '../helpers/redirect';

export default class ErrorHandler extends React.Component {
  static async getInitialProps(ctx) {
    if (ctx.res) {
      const path = getRedirect(ctx);
      if (path) return redirectPermanent(ctx, path);
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
    if (ctx.res) {
      ctx.res.statusCode = 404;
    }
    return { error: 'No matching content found', statusCode: 404 };
  }

  render() {
    return <Error404 {...this.props} />;
  }
}
