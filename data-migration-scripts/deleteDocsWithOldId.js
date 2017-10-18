require('dotenv').config();
const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: '1f1lcoov',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
});

async function main() {
  // const docs = await client.fetch('*[_type in ["person"] && oldId?][1..1000]');
  const docs = await client.fetch('*[_type in ["person"] && firstName == "Delete"][1..1000]');
  /* eslint-disable no-restricted-syntax, no-await-in-loop */
  for (const doc of docs) {
    try {
      await client.delete(doc._id);
    } catch (e) {
      console.log('Failed to delete', e);
    }
  }
  console.log('done deleting docs with old id');
}

main();
