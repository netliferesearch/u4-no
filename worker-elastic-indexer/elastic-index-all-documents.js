require('dotenv').config();
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: process.env.ES_HOST,
});

// get Sanity documents

// legacy publications: we need to download pdf and analyze it's contents before inserting as main content.

// new publications: need to collapse down their main content

const prepareElasticSearchBulkInsert = () => {};

function main() {}

main();
