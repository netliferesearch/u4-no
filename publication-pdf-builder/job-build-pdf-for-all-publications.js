/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
const { getSanityClient, uploadPDF, buildPDF } = require('./pdf-lib');

async function main() {
  console.log('Starting work');
  const client = getSanityClient();
  const docs = await client.fetch('*[_type in ["publication"] && _id == "f62b433d-9bbf-4bcb-8a4d-9aed37e5afcd" ]');

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
