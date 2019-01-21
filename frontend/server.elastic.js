const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: process.env.ES_HOST,
  apiVersion: '6.5',
});

module.exports = function (req, res) {
  if (req.query) {
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
  }

  console.log('Search endpoint was called with', req.body);
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'No query given.' });
  }
  return client.search(
    {
      index: 'u4-*',
      body,
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
