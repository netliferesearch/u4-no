require('dotenv').config();
const axios = require('axios');

/**
 * Purpose: Make it possible to generate PDF preview.
 *
 * Example url /generate-pdf-preview?id=123-456&url=https://u4-frontend-staging.herokuapp.com/printpreview
 * Url is configurable.
 */
async function publicationPdfPreviewHandler(req, res) {
  const { url } = req.query;
  // Also support older url path '/previewpdf/:type/:id' defined in server.js
  // by also checking req.params.id. This way of fetching pdf does not let us
  // override the url target for DocRaptor but it's kept around to avoid breakage.
  const id = req.query.id || req.params.id || '';
  if (!id) {
    return res.status(400).send('Missing publication id (?id=123)');
  }
  try {
    const response = await axios(pdfConfig({ id, url }));
    const stream = response.data;
    stream.on('end', () => res.end());
    stream.pipe(res);
  } catch (e) {
    console.error('Error', e);
    res.status(500).send('Error: Was not able to load pdf correctly');
  }
}

const pdfConfig = ({
  id = '',
  title = 'output',
  url = `https://u4-frontend-staging.herokuapp.com/printpreview`,
}) => {
  const token = process.env.DOCRAPTOR_API_KEY;
  const baseurl = new URL(url).origin;
  return {
    url: `https://${token}@docraptor.com/docs`,
    method: 'POST',
    encoding: null, // IMPORTANT! This produces a binary body response instead of text
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      doc: {
        user_credentials: token,
        document_url: `${url}/${id}`,
        type: 'pdf',
        name: title,
        test: true,
        prince_options: {
          //baseurl: 'https://www.u4.no', // URL to use for generating absolute URLs for assets from relative URLs
          baseurl, // URL to use for generating absolute URLs for assets from relative URLs
          //   media:   "screen",          // use screen styles instead of print styles
        },
      },
    },
    responseType: 'stream',
  };
};

module.exports = { publicationPdfPreviewHandler };
