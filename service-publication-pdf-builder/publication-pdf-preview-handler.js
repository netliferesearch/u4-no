require('dotenv').config();
const axios = require('axios');

/*
 * Purpose: To be used by frontend/server.js, send pdf preview file to browser
 */

 const pdfConfig = ({ id = '', title = 'output' }) => {
   const token = process.env.DOCRAPTOR_API_KEY;
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
         document_url: `https://beta.u4.no/printpreview/${id}`,
         type: 'pdf',
         name: title,
         test: true,
         prince_options: {
           baseurl: 'https://www.u4.no', // URL to use for generating absolute URLs for assets from relative URLs
           //   media:   "screen",          // use screen styles instead of print styles
         },
       },
     },
     responseType: 'stream',
   };
 };

async function publicationPdfPreviewHandler(req, res) {
  const { id = '' } = req.params;
  try {
    const response = await axios(pdfConfig({ id }));
    const stream = response.data;
    stream.on('end', () => res.end());
    stream.pipe(res);
  } catch (e) {
    console.error('Error', e);
    res.status(500).send('Error: Was not able to load pdf correctly');
  }
}

module.exports = { publicationPdfPreviewHandler };
