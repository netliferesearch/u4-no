require('dotenv').config();
const axios = require('axios');
const { pdfConfig } = require('./pdfConfig');
/**
 * Purpose: Receives publication url to render pdf from
 *
 * 1.
 *
 */
async function pdfGenerationHandler(req, res) {
  const { url = 'no url' } = req.query;
  try {
    const response = await axios(pdfConfig({ url }));
    const stream = response.data;
    // stream.on('end', () => res.end());
    stream.pipe(res);
  } catch (e) {
    console.error('Error', e);
    res.send('Error: Was not able to generate pdf');
  }
}

module.exports = { pdfGenerationHandler };
