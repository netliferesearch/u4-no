/* eslint no-debugger: off */
require('dotenv').config();
const elasticsearch = require('elasticsearch');
const Promise = require('bluebird');
const path = require('path');
const fs = require('fs');
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
  apiVersion: '7.2',
});

const prepareElasticSearchBulkInsert = (documents = []) =>
  _.flatten(
    documents.map(doc => {
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
    })
  );

const insertElasticSearchData = (documents = []) =>
  client.bulk({
    body: prepareElasticSearchBulkInsert(documents),
  });

const doBatchInsert = async (documents = []) => {
  const batchSize = process.env.ES_BATCH_SIZE || 500;
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
          JSON.stringify(result.items.filter(({ index }) => index.status > 201), null, 2)
        );
      }
    } catch (e) {
      console.error('Failed to insert documents', e);
    }
  }
};

const deleteDocuments = (documents = []) => {
  if (documents.length === 0) {
    return;
  }
  return client
    .bulk({
      body: documents.map(({ _id, _index }) => ({
        delete: { _index, _type: 'u4-searchable', _id },
      })),
    })
    .catch(err => console.log('Failed to delete elastic documents', err));
};

// code sourced from:
// https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-scroll
const getAllElasticsearchDocuments = async () => {
  console.log('getAllElasticsearchDocuments()');
  const allDocs = [];
  const version = process.env.ES_ENV || 'staging';
  const responseQueue = [
    await client.search({
      index: `u4-${version}-*`,
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
    response.hits.hits.forEach(hit => {
      allDocs.push(hit);
    });
    // check to see if we have collected all of the titles
    if (response.hits.total === allDocs.length) {
      console.log('Number of ES docs found:', allDocs.length);
      break;
    }
    console.log('Loading more elastic documents, already found:', allDocs.length);
    responseQueue.push(
      await client.scroll({
        scrollId: response._scroll_id,
        scroll: '30s',
      })
    );
  }
  return allDocs;
};

const generateChangelist = ({ elasticDocuments = [], sanityDocuments = [] }) => {
  const docsToInsertOrUpdate = sanityDocuments.filter(sanDoc => {
    const foundEsDoc = elasticDocuments.find(esDoc => esDoc._id === sanDoc._id);
    if (!foundEsDoc) {
      // new document that should be inserted
      return true;
    }
    return foundEsDoc._source.updatedAt !== sanDoc._updatedAt;
  });
  return {
    docsToInsertOrUpdate,
    docsToDelete: elasticDocuments.filter(
      esDoc => !sanityDocuments.find(({ _id }) => _id === esDoc._id)
    ),
  };
};

async function main() {
  console.log('starting work');
  const dataset =
    process.env.REACT_APP_DATASET === 'staging' || process.env.APP_DATASET === 'staging'
      ? 'staging'
      : 'production';
  console.log('Downloading sanity dataset');
  const { data } = await axios
    .get('https://1f1lcoov.api.sanity.io/v1/data/export/' + dataset)
    .catch(err => {
      console.log('Failed to get dataset', err);
      process.exit(-1);
    });
  console.log('Finished downloading dataset, proceeding with work');

  // // Specify local file if you want speedy development
  // const data = fs.readFileSync('./production.json', { encoding: 'UTF-8' });
  const allDocuments = parseNDJSON(data);

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

  // Ensure that we don't index drafts documents, nor unecessary types.
  const documentsToProcess = allDocuments
    .filter(({ _type }) => typesToProcess.find(type => type === _type))
    .filter(({ _id }) => !_id.startsWith('drafts.'))
    // remove frontpage from search results
    .filter(({ _id }) => _id !== 'ea5779de-5896-44a9-8d9e-31da9ac1edb2')
    // Only persons with a slug and at least one affiliation should be searchable.
    .filter(
      ({ _type, slug: { current = '' } = {}, affiliations = [] }) =>
        _type !== 'person' || (_type === 'person' && current && affiliations.length > 0)
    );

  const elasticDocuments = await getAllElasticsearchDocuments().catch(err => {
    console.error('Failed to fetch allElasticDocs', err);
    process.exit(1);
  });

  const { docsToInsertOrUpdate, docsToDelete } = generateChangelist({
    sanityDocuments: documentsToProcess,
    elasticDocuments,
  });

  const processedDocuments = await Promise.map(
    docsToInsertOrUpdate,
    document =>
      processDocument({ document, allDocuments }).catch(err =>
        console.error('Failed to process document', document, err)
      ),
    // add concurrency cap because we download legacy pdfs if not present locally.
    { concurrency: process.env.CACHE_PDF ? -1 : 5 }
  );

  console.log(`Found ${docsToDelete.length} to delete`);
  console.log('How many documents to insert/update/index:', processedDocuments.length);

  await Promise.all([doBatchInsert(processedDocuments), deleteDocuments(docsToDelete)]);
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
