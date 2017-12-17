require('dotenv').config();
const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: '1f1lcoov',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
});

/**
 * Purpose: Listens for publications being published. Upon discovering
 * publication events this process will build a pdf and upload it to
 */
async function startPdfWorker() {
  console.log('Start pdf worker');
  const siteUrl = process.env.PUBLICATIONS_BASE_URL || 'https://beta.u4.no/publications';
  const query = '*[_type in ["publication"]]';
  client.listen(query).subscribe(({ transition, result = {} }) => {
    if (transition !== 'update') {
      // not an update event, do nothing
      return;
    }
    if (result.legacypdf) {
      console.log('Publication has legacypdf attached. Skipping build pdf for it');
      return;
    }
    const { slug = {} } = result;
    if (!slug.current) {
      console.warn('No slug defined for document title', result.title);
      return;
    }
    const url = `${siteUrl}/${slug.current}/print`;
    console.log(`Build pdf for url ${url}`);
  });
}

startPdfWorker();
