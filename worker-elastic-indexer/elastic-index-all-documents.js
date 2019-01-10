require('dotenv').config();
const elasticsearch = require('elasticsearch');
const _ = require('lodash');
const { loadSanityDataFile, processPublication } = require('./elastic-indexer.lib');

const client = new elasticsearch.Client({
  host: process.env.ES_HOST,
  apiVersion: '6.5',
});

// get Sanity documents

// legacy publications: we need to download pdf and analyze it's contents before inserting as main content.

// new publications: need to collapse down their main content

// prepare the call with which Elasticsearch will be called.
const prepareElasticSearchBulkInsert = (documents = []) => {
  const _index = 'u4-test';
  return _.flatten(documents.map((doc) => {
    const { _type, _id, ...restOfDoc } = doc;
    const metadata = { _index, _type, _id };
    return [{ index: metadata }, { ...restOfDoc }];
  }));
};

const insertElasticSearchData = (documents = []) =>
  new Promise((resolve, reject) => {
    client.bulk(
      {
        body: prepareElasticSearchBulkInsert(documents),
      },
      (err, response) => {
        if (err) {
          return reject(err);
        }
        return resolve(response);
      },
    );
  });

async function main() {
  const allDocuments = loadSanityDataFile('./test-data.ndjson');
  const publications = allDocuments
    .filter(({ _type }) => _type === 'publication')
    .map(document => processPublication({ document, allDocuments }));
  try {
    const result = await insertElasticSearchData(publications);
    console.log('Done with work! Api responded with', JSON.stringify(result, null, 2));
  } catch (e) {
    console.error('Failed to insert documents', e);
  }
}

main();
