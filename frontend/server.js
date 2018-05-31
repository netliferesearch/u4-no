require('dotenv').config({ path: './.env' });
const next = require('next');
const routes = require('./routes');
const forceSsl = require('force-ssl-heroku');
const { publicationPdfHandler } = require('../publication-pdf-builder/publication-pdf-handler');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);

// With express
const express = require('express');

app.prepare().then(() => {
  const server = express();
  if (process.env.NODE_ENV === 'production') {
    server.use(forceSsl);
  }
  server.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send('User-agent: *\nDisallow:');
  });
  server.get('/publications/:slug/pdf', publicationPdfHandler);
  server.use(handler).listen(process.env.PORT || 3000);
});
