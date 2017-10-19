// server.js
const next = require('next');
const routes = require('./routes');
const forceSsl = require('force-ssl-heroku');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);

// With express
const express = require('express');

app.prepare().then(() => {
  const server = express();
  if (process.env.NODE_ENV === 'production') {
    server.use(forceSsl);
  }
  server.use(handler).listen(process.env.PORT || 3000);
});
