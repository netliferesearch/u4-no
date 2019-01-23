require('dotenv').config();
const elasticsearch = require('elasticsearch');
const Promise = require('bluebird');
const _ = require('lodash');
const { loadSanityDataFile, processDocument, getIndexName } = require('./elastic-indexer.lib');
const { setupMappings } = require('./elastic-mappings');

const client = new elasticsearch.Client({
  host: process.env.ES_HOST,
  apiVersion: '6.5',
});

const prepareElasticSearchBulkInsert = (documents = []) =>
  _.flatten(documents.map((doc) => {
    const { _type, _id, ...restOfDoc } = doc;
    const metadata = { _index: getIndexName(doc), _type: 'u4-searchable', _id };
    // Add plain type field to be used as a custom type field.
    // Also try to make plural types into singular. Convert topics -> topic.
    const type = _type.replace(/s$/gi, '');
    return [{ index: metadata }, { ...restOfDoc, type }];
  }));

const insertElasticSearchData = (documents = []) =>
  client.bulk({
    body: prepareElasticSearchBulkInsert(documents),
  });

const doBatchInsert = async (documents = []) => {
  const batchSize = 1000;
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

async function main() {
  console.log('starting work');

  // const { data } = await axios
  //   .get('https://1f1lcoov.api.sanity.io/v1/data/export/production')
  //   .catch((err) => {
  //     console.log('Failed to get dataset', err);
  //     process.exit(-1);
  //   });
  // const allDocuments = parseNDJSON(data);

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
    // TODO: enable these types
    // 'event',
    // 'course'
  ];
  console.log('Document types to process:\n', typesToProcess, '\n');

  const processedDocuments = await Promise.map(
    allDocuments
      .filter(({ _type }) => typesToProcess.find(type => type === _type))
      .filter(({ _id }) => !_id.startsWith('drafts.'))
      // remove frontpage from search results
      .filter(({ _id }) => _id !== 'ea5779de-5896-44a9-8d9e-31da9ac1edb2')
      // Only persons with a slug should be searchable.
      .filter(({ _type, slug: { current = '' } = {} }) =>
        _type !== 'person' || (_type === 'person' && current)),
    document =>
      processDocument({ document, allDocuments })
        .then((doc) => {
          console.log('Prepared:', doc._id);
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
