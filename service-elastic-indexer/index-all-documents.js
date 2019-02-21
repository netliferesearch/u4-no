/* eslint no-debugger: off */
require('dotenv').config();
const elasticsearch = require('elasticsearch');
const Promise = require('bluebird');
const path = require('path');
const axios = require('axios');
const _ = require('lodash');
const {
  loadSanityDataFile,
  processDocument,
  getIndexName,
  parseNDJSON,
} = require('./lib/indexer.lib');
const { setupMappings } = require('./lib/mappings.lib');

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

const generateChangelist = ({ elasticDocuments = [], sanityDocuments = [] }) => {
  const docsToInsertOrUpdate = sanityDocuments.filter((sanDoc) => {
    const foundEsDoc = elasticDocuments.find(esDoc => esDoc._id === sanDoc._id);
    if (!foundEsDoc) {
      // new document that should be inserted
      return true;
    }
    return foundEsDoc._source.updatedAt !== sanDoc._updatedAt;
  });
  return {
    docsToInsertOrUpdate,
    docsToDelete: elasticDocuments.filter(esDoc => !sanityDocuments.find(({ _id }) => _id === esDoc._id)),
  };
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

  // find documents that have
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
  const { documents: allDocuments } = loadSanityDataFile(path.join(__dirname, './sanity-export'));

  // const idsToFind = [
  //   'pub-392',
  //   'pub-425',
  //   'b3c15eed-4dc6-4c0b-9602-f6b130015a41',
  //   'c79b642b-3d61-4e1b-b648-a7bdae721479',
  // ];
  //
  // const foundDocs = allDocuments.filter(({ _id }) => idsToFind.find(id => id === _id));
  //
  // console.log('foundDocs.length', foundDocs.length);
  //
  // console.log(JSON.stringify(
  //   foundDocs.map(({
  //     _id, _createdAt, _type, _updatedAt,
  //   }) => ({
  //     _id,
  //     _createdAt,
  //     _type,
  //     _updatedAt,
  //   })),
  //   null,
  //   2,
  // ));
  //
  // process.exit(0);

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
        // .then((doc) => {
        //   return doc;
        // })
        .catch(err => console.error('Failed to process document', document, err)),
    { concurrency: -1 },
  );
  console.log('How many documents to index:', processedDocuments.length);
  await doBatchInsert(processedDocuments);
  console.log('Done with work');
}

// Calls main() if file is executed directly with node.
if (require.main === module) {
  main();
} else {
  module.exports = {
    generateChangelist,
  };
}
