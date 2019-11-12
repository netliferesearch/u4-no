require('dotenv').config();
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: process.env.ES_HOST,
  apiVersion: '7.2',
});

const main = async () => {
  // hardcoded for safety, if you want to change production index,
  // rename this.
  const index = 'u4-staging-*';
  try {
    const result = await client.indices.delete({ index });
    console.log(`Deleted indexes '${index}', result: `, result);
  } catch (e) {
    console.log('Failed to delete indexes', e);
  }
};

main();
