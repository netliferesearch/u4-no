function getAnalyzer({ language = '' }) {
  const analyzers = {
    en_US: 'english',
    fr_FR: 'french',
    uk_UA: null,
    pt_PT: 'portuguese',
    en_EN: 'english',
    'English and French': true,
    ru_RU: 'russian',
    es_ES: 'spanish',
  };
  return analyzers[language];
}

function getPublicationMapping() {
  return {
    mappings: {
      publication: {
        properties: {
          content: {
            type: 'string',
            analyzer: 'english',
          },
          date: {
            type: 'date',
          },
        },
      },
    },
  };
}

function getMapping({ _type, language = 'en_US' }) {}

module.exports = {
  getMapping,
};
