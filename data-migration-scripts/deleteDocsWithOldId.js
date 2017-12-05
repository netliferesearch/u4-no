require('dotenv').config();
const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: '1f1lcoov',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
});

async function main() {
  // const docs = await client.fetch('*[_type in ["person"] && oldId?][1..1000]');
  const docs = await client.fetch('*[_type in ["article"] && _id match "resource*"][1..2000]');
  /* eslint-disable no-restricted-syntax, no-await-in-loop */
  for (const doc of docs) {
    try {
      console.log(`deleting ${doc._id}`);
      await client.delete(doc._id);
    } catch (e) {
      console.log('Failed to delete', e);
    }
  }
  console.log('done deleting docs with old id');
}

main();
