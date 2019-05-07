require('dotenv').config({ path: './.env' });
const next = require('next');
const routes = require('./routes');
const forceSsl = require('force-ssl-heroku');
const bodyParser = require('body-parser');
const {
  publicationPdfHandler,
} = require('../service-publication-pdf-builder/publication-pdf-handler');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);

// With express
const express = require('express');

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());
  if (process.env.NODE_ENV === 'production') {
    server.use(forceSsl);
  }
  server.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send('User-agent: *\nDisallow:');
  });
  server.get('//$', (req, res) => res.redirect(301, '/'));
  // /search-v2 was a temporary test url, that we want to remove from any
  // browsers by telling them that the page has been moved to /search.
  server.get('/search-v2', (req, res) => res.redirect(301, '/search'));
  server.get('/publications/:slug/pdf', publicationPdfHandler);
  server.get('/publications/:slug.pdf', publicationPdfHandler);
  server.use(handler);
  server.listen(process.env.PORT || 3000);
});
