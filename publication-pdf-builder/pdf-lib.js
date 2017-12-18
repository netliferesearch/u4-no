/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
require('dotenv').config();
const axios = require('axios');
const sanityClient = require('@sanity/client');
const fs = require('fs');
const pdfConfig = require('./pdfConfig');

const getSanityClient = () =>
  sanityClient({
    projectId: '1f1lcoov',
    dataset: 'production',
    token: process.env.SANITY_TOKEN,
  });

const buildPDF = async ({ url, title = 'output.pdf' }) => {
  const pdfDataBuffer = await axios(pdfConfig({ url, title }));
  return pdfDataBuffer;
};

const writePDFBufferToFile = async ({ axiosPDFResponse, filename = 'output.pdf' }) =>
  new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(filename);
    axiosPDFResponse.pipe(writeStream);
    axiosPDFResponse.on('error', reject);
    axiosPDFResponse.on('end', resolve);
  });

const uploadPDF = async ({
  targetDocument,
  pdfFilename,
  // if no readStream provided, try to create a read stream from the pdf
  // filename provided
  dataStream = fs.createReadStream(pdfFilename),
}) => {
  const client = getSanityClient();
  if (!fs.existsSync(pdfFilename)) {
    throw Error('Could not find file to upload', pdfFilename);
  }
  const document = await client.assets.upload('file', dataStream, {
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
