require('dotenv').config();
const sanityClient = require('@sanity/client');
const bluebird = require('bluebird');

const client = sanityClient({
  projectId: '1f1lcoov',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
});

/**
 * Purpose of this script is to simply re-save certain sanity documents to
 * trigger slug generation.
 */
const main = async () => {
  const sanityEntities = await client.fetch('*[_type in ["publication", "topics"]][1..10000]');
  await bluebird.map(
    sanityEntities,
    (entity) => {
      console.log('Processing', entity._id);
      return client.createOrReplace(entity);
    },
    { concurrency: 8 },
  );
  console.log('Done with work');
};

main();
