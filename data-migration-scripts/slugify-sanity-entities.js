require('dotenv').config();
const sanityClient = require('@sanity/client');
const bluebird = require('bluebird');
const slugify = require('slugify');

const client = sanityClient({
  projectId: '1f1lcoov',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
});

/**
 * Purpose of this script is to dynamically add slugs to documents where missing.
 */
const main = async () => {
  const sanityEntities = await client.fetch(
    '*[_type in ["publication", "topics"]][1..10000]{_id, title, slug}',
  );
  await bluebird.map(
    [sanityEntities[0]],
    ({ _id, title, slug }) => {
      if (slug) {
        console.log(`Id: ${_id} already has slug ${slug}`);
        return new Promise(true);
      }
      // TODO create something smart to set slugs for all documents
      console.log('Processing id', _id);
      // return (
      //   client
      //     .patch(_id)
      //     // .set({})
      //     .commit()
      //     .catch(err => console.log(err))
      // );
    },
    { concurrency: 8 },
  );
  console.log('Done with work');
};

main();
