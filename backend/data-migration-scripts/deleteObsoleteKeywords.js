require('dotenv').config();
const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: '1f1lcoov',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
});

async function main() {
  const docs = await client.fetch("*[_type == 'keyword' && keyword match 'Delete'][0..10000]");
  for (const doc of docs) {
    await client.delete(doc._id);
    console.log('Deleted ', doc._id);
  }
  console.log('done deleting keywords marked for deletion');
}

main();
