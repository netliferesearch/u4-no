// require('dotenv').config();
const sanityClient = require('@sanity/client');

// return url from type and slug
const buildUrl = ({ _type = 'notype', slug = {} }) => {
  const actualSlug = slug.current || slug;
  if (_type === 'publication') {
    return `/publications/${actualSlug}`;
  } else if (_type === 'topics') {
    return `/topics/${actualSlug}`;
  } else if (_type === 'article') {
    return `/${actualSlug}`;
  } else if (_type === 'person') {
    return `/the-team/${actualSlug}`;
  } else if (_type === 'frontpage') {
    return `/${actualSlug}`;
  } else if (_type === 'course') {
    return `/courses/${actualSlug}`;
  } else if (_type === 'event') {
    return `/events/${actualSlug}`;
  } else if (_type === 'asset') {
    return `/assets/${actualSlug}`;
  } else if (_type === 'term') {
    return `/terms#${actualSlug}`;
  } else if (_type === 'people') {
    return `/the-team`;
  }
  return actualSlug;
};

// find entry and redirect
async function shortUrlHandler(req, res) {
  const { shortSlug = '' } = req.params;

  // if no shortslug go to home
  if (!shortSlug) {
    res.redirect(301, '/');
  }

  const client = sanityClient({
    projectId: '1f1lcoov',
    dataset: 'production',
    token: process.env.SANITY_TOKEN,
    useCdn: true,
  });

  const sanityQuery = '*[shortSlug.current == $shortSlug][0]{_type, slug}';
  const sanityQueryParam = { shortSlug };
  const sanityResults = await client.fetch(sanityQuery, sanityQueryParam);

  if (!(sanityResults && sanityResults._type && sanityResults.slug)) {
    // if no results go home
    res.redirect(301, '/');
  }
  console.log(sanityResults);
  const pageUrl = buildUrl(sanityResults);
  res.redirect(301, pageUrl);
}

module.exports = { shortUrlHandler };
