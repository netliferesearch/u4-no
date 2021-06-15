require('dotenv').config({ path: './.env' });
const next = require('next');
const forceSsl = require('force-ssl-heroku');
const {
  publicationPdfHandler,
} = require('../service-publication-pdf-builder/publication-pdf-handler');
const {
  publicationPdfPreviewHandler,
} = require('../service-publication-pdf-builder/publication-pdf-preview-handler');

const { shortUrlHandler } = require('./helpers/_shorturl');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

// With express
const express = require('express');

app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  if (process.env.NODE_ENV === 'production' && process.env.SKIP_SSL !== 'true') {
    server.use(forceSsl);
  }

  server.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    if (process.env.ROBOTS_TXT_DISALLOW_ALL === 'true') {
      // Prevent indexing staging and test environments.
      return res.send(['User-agent: *', 'Disallow: /'].join('\n'));
    }
    /**
     * In production:
     * Disallow indexing preview functionality, and unpublished functionality
     */
    return res.send(
      [
        'User-agent: *',
        'Disallow: /v2/',
        'Disallow: /preview/',
        'Disallow: /previewpdf/',
        'Disallow: /generate-pdf-preview',
      ].join('\n')
    );
  });

  server.use('/public', express.static('public'));

  server.get('//$', (req, res) => res.redirect(301, '/'));

  // Handle multiple ways to request a PDF file for a publication.
  server.get('/publications/:slug/pdf', publicationPdfHandler);
  server.get('/publications/:slug.pdf', publicationPdfHandler);
  server.get('/publication/:slug.pdf', publicationPdfHandler);
  server.get('/generate-pdf-preview', publicationPdfPreviewHandler);
  /**
   * To be replaced by '/generate-pdf-preview' which is a bit more clearly worded
   * and has extra features. Keeping this around to avoid breaking old urls.
   */
  server.get('/previewpdf/:type/:id', publicationPdfPreviewHandler);
  server.get('/r/:shortSlug', shortUrlHandler);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
