/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
// const { getSanityClient, uploadPDF, buildPDF } = require('./pdf-lib');
const { uploadPDF, buildPDF } = require('./pdf-lib');
const { createClient } = require('next-sanity');

const getSanityClient = () =>
  createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET || "production",
    token: process.env.THUMBNAIL_GENERATOR_SANITY_TOKEN,
    apiVersion: process.env.SANITY_API_VERSION,
  });

async function main() {
  console.log('Starting work');
  const client = getSanityClient();


  const docs = await client.fetch('*[_type in ["publication"] && _id == "8441ffe5-361a-4be9-8344-838fd5c38841" ]');

  /* eslint-disable no-restricted-syntax, no-await-in-loop */
  for (const doc of docs) {
    const { slug, title } = doc;
    const url = `https://www.u4.no/publications/${slug.current}`;
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
