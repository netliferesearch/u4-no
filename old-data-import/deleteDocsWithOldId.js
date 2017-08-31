
require('dotenv').config
const sanityClient = require('@sanity/client');
const client = sanityClient({
  projectId: '1f1lcoov',
  dataset: 'production',
  token: process.env.SANITY_TOKEN
});

async function main() {
  const docs = await client.fetch('*[oldId?]')
  for (const doc of docs) {
    await client.delete(doc._id)
    console.log('Deleted', doc)
  }
  console.log('done deleting docs with old id')
}

main()
