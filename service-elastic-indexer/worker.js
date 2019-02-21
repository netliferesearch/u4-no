/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
require('dotenv').config();
const sanityClient = require('@sanity/client');
const elasticsearch = require('elasticsearch');
const { getIndexName } = require('./lib/indexer.lib');

const elasticClient = new elasticsearch.Client({
  host: process.env.ES_HOST,
  apiVersion: '6.5',
});

/**
 * Purpose: Listen for changes to Sanity types, and
 */
async function startElasticWorker() {
  console.log('Start elasticsearch worker');
  const client = sanityClient({
    projectId: '1f1lcoov',
    dataset: 'production',
    useCdn: true,
  });
  const typesToWatch = [
    'person',
    'article',
    'term', // glossary
    'topics',
    'publication',
    'frontpage',
    'event',
    'course',
    // 'people',
    // 'nuggets',
    // 'resource',
    // 'keyword',
    // 'nugget',
    // 'courseType',
    // 'service',
    // 'contentType',
    // 'blurb',
    // 'publicationType',
  ];
  const query = '*[_type in $typesToWatch]';
  client
    .listen(query, { typesToWatch }, { includePreviousRevision: true, includeResult: true })
    .subscribe(async (event) => {
      console.log(JSON.stringify(event, null, 2));
      // delete or create in ES
      event.mutations.map((mut) => {
        if (mut.delete) {
          const { _id, _type } = event.previous;
          elasticClient
            .delete({
              index: getIndexName(event.previous),
              type: _type,
              id: _id,
            })
            .then(result => console.log('deleted document: \n', result))
            .catch(err => console.error('Failed to delete document', { doc: event.previous, err }));
        } else if (mut.create || mut.createOrReplace) {
          const { _id, _type, ...restOfDoc } = event.result;
          // TODO: add custom processing for each type
          const documentToIndex = { ...restOfDoc };
          elasticClient
            .index({
              index: getIndexName(event.result),
              type: _type,
              id: _id,
              body: documentToIndex,
            })
            .then(result => console.log('created/updated document: \n', result))
            .catch(err =>
              console.error('Failed to create/update document', { doc: event.result, err }));
        }
      });
    });
}

startElasticWorker();
