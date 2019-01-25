/* eslint no-debugger: off */
require('dotenv').config();
const elasticsearch = require('elasticsearch');
const Promise = require('bluebird');
const axios = require('axios');
const _ = require('lodash');
const {
  loadSanityDataFile,
  processDocument,
  getIndexName,
  parseNDJSON,
} = require('./elastic-indexer.lib');
const { setupMappings } = require('./elastic-mappings');

const client = new elasticsearch.Client({
  host: process.env.ES_HOST,
  apiVersion: '6.5',
});

const prepareElasticSearchBulkInsert = (documents = []) =>
  _.flatten(documents.map((doc) => {
    const {
      _type,
      _id,
      _rev: rev,
      _createdAt: createdAt,
      _updatedAt: updatedAt,
      ...restOfDoc
    } = doc;
    const metadata = { _index: getIndexName(doc), _type: 'u4-searchable', _id };
    // Add plain type field to be used as a custom type field.
    // Also try to make plural types into singular. Convert topics -> topic.
    const type = _type.replace(/s$/gi, '');
    return [
      { index: metadata },
      {
        ...restOfDoc,
        type,
        rev,
        createdAt,
        updatedAt,
      },
    ];
  }));

const insertElasticSearchData = (documents = []) =>
  client.bulk({
    body: prepareElasticSearchBulkInsert(documents),
  });

const doBatchInsert = async (documents = []) => {
  const batchSize = 50;
  const batches = _.chunk(documents, batchSize);
  for (const batch of batches) {
    try {
      const result = await insertElasticSearchData(batch);
      console.log('batch insert result:', {
        ...result,
        items: result.items.length,
      });
      if (result.errors) {
        console.log(
          'batch insert, additional error information:',
          JSON.stringify(result.items.filter(({ index }) => index.status > 201), null, 2),
        );
      }
    } catch (e) {
      console.error('Failed to insert documents', e);
    }
  }
};

// code sourced from:
// https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-scroll
const getAllElasticsearchDocuments = async () => {
  console.log('getAllElasticsearchDocuments()');
  const allDocs = [];
  const responseQueue = [
    await client.search({
      index: 'u4-*',
      scroll: '30s', // keep the search results "scrollable" for 30 seconds
      _source: ['createdAt', 'updatedAt'],
      body: {
        query: { match_all: {} },
      },
      size: 100,
    }),
  ];
  while (responseQueue.length) {
    const response = responseQueue.shift();
    // collect the titles from this response
    response.hits.hits.forEach((hit) => {
      allDocs.push(hit);
    });
    // check to see if we have collected all of the titles
    if (response.hits.total === allDocs.length) {
      console.log('every "test" title', allDocs);
      break;
    }
    console.log('Loading more elastic documents, already found:', allDocs.length);
    responseQueue.push(await client.scroll({
      scrollId: response._scroll_id,
      scroll: '30s',
    }));
  }
  return allDocs;
};

async function main() {
  console.log('starting work');

  // const { data } = await axios
  //   .get('https://1f1lcoov.api.sanity.io/v1/data/export/production')
  //   .catch((err) => {
  //     console.log('Failed to get dataset', err);
  //     process.exit(-1);
  //   });
  // const allDocuments = parseNDJSON(data);
  //
  // const topics = allDocuments.filter(({ _type }) => _type === 'topics');
  // console.log(JSON.stringify(topics, null, 2));

  // try {
  //   // Shape of resulting documents
  //   // { _index: 'u4-en-us',
  //   //    _type: 'u4-searchable',
  //   //    _id: '09b6af64-e99c-413d-b734-7b6446280289',
  //   //    _score: 1,
  //   //    _source: [Object] }
  //   const allElasticDocs = await getAllElasticsearchDocuments();
  //   console.log(JSON.stringify(allElasticDocs, null, 2));
  // } catch (error) {
  //   console.error(error);
  // } finally {
  //   process.exit(0);
  // }

  // Uncomment if want to quickly index a local dataset.
  const { documents: allDocuments } = loadSanityDataFile('./sanity-export');

  const types = {};
  allDocuments.forEach(({ _type }) => (types[_type] = true));
  console.log('Document types found:\n', Object.keys(types), '\n');

  const languages = {};
  allDocuments
    .filter(({ language }) => language)
    .forEach(({ language }) => (languages[language] = true));
  console.log('Document languages to process:\n', Object.keys(languages), '\n');

  await setupMappings({ languages: Object.keys(languages) });

  const typesToProcess = [
    'term', // glossary
    'publication',
    'topics',
    'article',
    'person',
    'frontpage',
    'event',
    'course',
  ];
  console.log('Document types to process:\n', typesToProcess, '\n');

  const processedDocuments = await Promise.map(
    allDocuments
      .filter(({ _type }) => typesToProcess.find(type => type === _type))
      .filter(({ _id }) => !_id.startsWith('drafts.'))
      // remove frontpage from search results
      .filter(({ _id }) => _id !== 'ea5779de-5896-44a9-8d9e-31da9ac1edb2')
      // Only persons with a slug and at least one affiliation should be searchable.
      .filter(({ _type, slug: { current = '' } = {}, affiliations = [] }) =>
        _type !== 'person' || (_type === 'person' && current && affiliations.length > 0)),
    document =>
      processDocument({ document, allDocuments })
        .then((doc) => {
          console.log('Prepared:', doc._id);
          if (
            doc._id === '0b516181-cd61-4329-875e-b79ea3221697' ||
            doc._id === 'd92320ff-d312-45d5-88d6-800c3c00170a'
          ) {
            debugger;
          }
          return doc;
        })
        .catch(err => console.error('Failed to process document', document, err)),
    { concurrency: -1 },
  );
  console.log('How many documents to index:', processedDocuments.length);
  await doBatchInsert(processedDocuments);
  console.log('Done with work');
}

main();
