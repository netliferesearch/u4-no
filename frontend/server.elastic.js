const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: process.env.ES_HOST,
  apiVersion: '6.5',
});

module.exports = function (req, res) {
  console.log('Search endpoint was called with', req.query);
  const { search: query = '*' } = req.query;

  return client.search(
    {
      index: 'u4-*',
      body: {
        query: {
          match: {
            title: query,
          },
        },
      },
    },
    (err, result) => {
      if (err) {
        console.error('Failed to do search', err);
        return res.status(500).json({ error: 'Failed to perform search.' });
      }
      return res.json(result);
    },
  );
};
