/* eslint-env node */

require('dotenv').config();
const axios = require('axios');
const sanityClient = require('@sanity/client');
const fs = require('fs');
const pdfConfig = require('./pdfConfig');

const client = sanityClient({
  projectId: '1f1lcoov',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
});
const buildPDF = async ({ url, title = 'output.pdf' }) => {
  const pdfDataBuffer = await axios(pdfConfig({ url }));
  return pdfDataBuffer;
};

const uploadPDF = async ({ targetDocument, pdfFilename }) => {
  if (!fs.existsSync(pdfFilename)) {
    throw Error('Could not find file to upload', pdfFilename);
  }
  const document = await client.assets.upload('file', fs.createReadStream(pdfFilename), {
    filename: pdfFilename,
    contentType: 'application/pdf',
  });
  console.log('Uploaded file', document);
  const patchPayload = {
    pdfFile: {
      _type: 'file',
      asset: {
        _ref: document._id,
        _type: 'reference',
      },
    },
  };
  console.log('Patch payload', patchPayload);
  const updatedDoc = await client
    .patch(targetDocument._id)
    .set(patchPayload)
    .commit();
  console.log('Updated document with pdf, doc name:', updatedDoc.title);
  console.log('Contents of updatedDoc.pdfFile', updatedDoc.pdfFile);
};

async function main() {
  console.log('Starting work');
  const docs = await client.fetch('*[_type in ["publication"] && _id == "f62b433d-9bbf-4bcb-8a4d-9aed37e5afcd" ]');

  /* eslint-disable no-restricted-syntax, no-await-in-loop */
  for (const doc of docs) {
    const { slug, title } = doc;
    const url = `https://beta.u4.no/publications/${slug.current}`;
    console.log('Rendering pdf from', url);
    const pdfFilename = `${slug.current}.pdf`;
    try {
      await buildPDF({ url, title: pdfFilename });
      console.log('Built pdf:', pdfFilename);
      await uploadPDF({ targetDocument: doc, pdfFilename });
    } catch (e) {
      console.log('buildPDF failed for:', pdfFilename);
    }
  }
  console.log('Done with work');
}

main();
