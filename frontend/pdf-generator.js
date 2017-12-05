require('dotenv').config();
const axios = require('axios');

/**
 * Purpose: Receives publication url to render pdf from
 *
 * 1.
 *
 */
async function pdfGenerationHandler(req, res) {
  const { url = 'no url' } = req.query;
  const config = {
    url: `https://${process.env.DOCRAPTOR_API_KEY}@docraptor.com/docs`,
    method: 'POST',
    encoding: null, // IMPORTANT! This produces a binary body response instead of text
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      doc: {
        document_url: `${url}/print`,
        type: 'pdf',
        test: process.env.PDF_TEST || false,
        prince_options: {
          baseurl: 'https://beta.u4.no', // URL to use for generating absolute URLs for assets from relative URLs
          //   media:   "screen",          // use screen styles instead of print styles
        },
      },
    },
    responseType: 'stream',
  };
  try {
    const response = await axios(config);
    const stream = response.data;
    // stream.on('end', () => res.end());
    stream.pipe(res);
  } catch (e) {
    console.error('Error', e);
    res.send('Error: Was not able to generate pdf');
  }
}

module.exports = { pdfGenerationHandler };
