require('dotenv').config({ path: './.env' });
const next = require('next');
const routes = require('./routes');
const forceSsl = require('force-ssl-heroku');
const { pdfGenerationHandler } = require('../publication-pdf-builder/pdf-generator');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);

// With express
const express = require('express');

app.prepare().then(() => {
  const server = express();
  if (process.env.NODE_ENV === 'production') {
    server.use(forceSsl);
  }
  server.get('/pdf', pdfGenerationHandler);
  server.use(handler).listen(process.env.PORT || 3000);
});
