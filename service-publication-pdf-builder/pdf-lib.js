/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
require('dotenv').config();
const axios = require('axios');
const sanityClient = require('@sanity/client');
const fs = require('fs');
const pdfConfig = require('./pdfConfig');
const dataset =
  process.env.REACT_APP_DATASET === 'staging' || process.env.APP_DATASET === 'staging'
    ? 'staging'
    : 'production';
const getSanityClient = () =>
  sanityClient({
    projectId: '1f1lcoov',
    dataset: dataset,
    token: process.env.PDF_WORKER_SANITY_TOKEN,
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
  const document = await client.assets.upload('file', fs.createReadStream(pdfFilename), {
    filename: pdfFilename,
    contentType: 'application/pdf',
  });
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
