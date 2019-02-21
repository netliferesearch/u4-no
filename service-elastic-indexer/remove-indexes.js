require('dotenv').config();
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: process.env.ES_HOST,
  apiVersion: '6.5',
});

const main = async () => {
  try {
    const result = await client.indices.delete({
      index: 'u4-*',
    });
    console.log('Deleted indexes. Result: ', result);
  } catch (e) {
    console.log('Failed to delete indexes', e);
  }
};

main();
