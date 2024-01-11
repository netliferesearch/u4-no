require('dotenv').config();

/**
 * DocRaptor configuration for an request with axios.
 * Set PDF_TEST to activate test mode in order
 * to prevent using of quota when testing the service.
 *
 * @param  {String} [url='']        url to page we want to render
 * @param  {String} [title='output']  title of the pdf returned
 * @return {Object}                 axios request configuration
 */
const pdfConfig = ({ url = '', title = 'output' }) => {
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
        document_url: `${url}/print`,
        type: 'pdf',
        name: title,
        test: process.env.PDF_TEST || false,
        pipeline: '10.1',
        prince_options: {
          baseurl: 'https://www.u4.no', // URL to use for generating absolute URLs for assets from relative URLs
          //baseurl: 'https://28ca-2001-700-2a01-100-8467-f280-217f-beec.ngrok-free.app', // when testing locally
          profile: 'PDF/UA-1', // create accessibility tags
          // media: "screen", // use screen styles instead of print styles
        },
      },
    },
    responseType: 'stream',
  };
};

module.exports = pdfConfig;
