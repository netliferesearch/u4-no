const axios = require('axios');

/**
 * Purpose: Receives publication url to render pdf from
 *
 * 1.
 *
 */
async function pdfGenerationHandler(req, res) {
  const { url = 'no url' } = req.query;
  const pdfEndpoint = process.env.PDF_ENDPOINT;
  try {
    const response = await axios.get(pdfEndpoint, {
      params: { url },
      responseType: 'stream',
    });
    const stream = response.data;
    stream.on('end', () => res.end());
    stream.pipe(res);
  } catch (e) {
    console.error('Error', e);
    res.send('Error: Was not able to generate pdf');
  }
}

module.exports = { pdfGenerationHandler };
