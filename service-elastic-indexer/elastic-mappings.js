const { getIndexName } = require('./elastic-indexer.lib');
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: process.env.ES_HOST,
  apiVersion: '6.5',
});

// setup mappings for each language and each type
const setupMappings = async ({ types = [], languages = [] }) => {
  const indexes = languages
    .map(language => getIndexName({ language }))
    .filter(indexName => !/\s/.test(indexName));
  console.log('Create indexes with mappings for', indexes);

  const analyzers = {
    'u4-en-us': 'english',
    'u4-en-en': 'english',
    'u4-fr-fr': 'french',
    'u4-pt-pt': 'portuguese',
    'u4-ru-ru': 'russian',
    'u4-es-es': 'spanish',
    'u4-uk-ua': 'russian',
  };

  for (const index of indexes) {
    try {
      const indexExists = await client.indices.exists({ index });
      if (indexExists) {
        continue; // skip iteration
      }
      const analyzer = analyzers[index];
      const result = await client.indices.create({
        index,
        body: {
          mappings: {
            'u4-searchable': {
              properties: {
                content: {
                  type: 'text',
                  analyzer,
                },

                // publication
                publicationTypeTitle: {
                  type: 'keyword',
                },
                topicTitles: {
                  type: 'keyword',
                },
                languageName: {
                  type: 'keyword',
                },
                lead: {
                  type: 'text',
                  analyzer,
                },
                mainPoints: {
                  type: 'text',
                  analyzer,
                },
                methodology: {
                  type: 'text',
                  analyzer,
                },
                // publication end

                // topic specific
                topicContent: {
                  type: 'text',
                  analyzer,
                },
                basicGuide: {
                  type: 'text',
                  analyzer,
                },
                agenda: {
                  type: 'text',
                  analyzer,
                },
                // topic specific, end

                // term specific
                termContent: {
                  type: 'text',
                  analyzer,
                },
                // term specific, end
              },
            },
          },
        },
      });
      console.log('Created index:', result);
    } catch (e) {
      console.error('Failed to create index', e);
    }
  }
};

module.exports = {
  setupMappings,
};
