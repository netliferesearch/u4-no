/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
require('dotenv').config();
const axios = require('axios');
const { createClient } = require('next-sanity');
const fs = require('fs');
const pdfConfig = require('./pdfConfig');

const getSanityClient = () =>
  createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET || 'production',
    token: process.env.THUMBNAIL_GENERATOR_SANITY_TOKEN,
    apiVersion: process.env.SANITY_API_VERSION,
  });

const buildPDF = async ({ url, title = 'output.pdf' }) => {
  const pdfDataBuffer = await axios(pdfConfig({ url, title }));
  return pdfDataBuffer;
};

const writePDFBufferToFile = async ({ dataStream, filename = 'output.pdf' }) =>
  new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(filename);
    dataStream.pipe(writeStream);
    dataStream.on('error', reject);
    dataStream.on('end', resolve);
  });

const uploadPDF = async ({ targetDocument, pdfFilename }) => {
  const client = getSanityClient();
  if (!fs.existsSync(pdfFilename)) {
    throw Error(`Could not find file to upload: ${pdfFilename}`);
  }
  console.log('Uploading file to Sanity:', pdfFilename);
  const document = await client.assets.upload('file', fs.createReadStream(pdfFilename), {
    filename: pdfFilename.split('/').pop(),
    contentType: 'application/pdf',
  });
  console.log('Sanity file asset created:', document._id);

  const patchPayload = {
    pdfFile: {
      _type: 'file',
      asset: {
        _ref: document._id,
        _type: 'reference',
      },
    },
  };
  return client
    .patch(targetDocument._id)
    .set(patchPayload)
    .commit();
};

module.exports = {
  getSanityClient,
  buildPDF,
  uploadPDF,
  writePDFBufferToFile,
};
