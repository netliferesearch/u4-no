require('dotenv').config();
const axios = require('axios');
const pdfConfig = require('./pdfConfig');
/**
 * Purpose: To be used by frontend/server.js, providing a pdf endpoint handler.
 */
async function pdfHandler(req, res) {
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

module.exports = { pdfHandler };
