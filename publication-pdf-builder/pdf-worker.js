/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
const some = require('lodash/some');
const {
  getSanityClient, uploadPDF, buildPDF, writePDFBufferToFile,
} = require('./pdf-lib');

require('dotenv').config();

/**
 * Purpose: Listens for publications being published. Upon discovering
 * publication events this process will build a pdf and upload it to
 */
async function startPdfWorker() {
  console.log('Start pdf worker');
  const client = getSanityClient();
  const siteUrl = process.env.PUBLICATIONS_BASE_URL || 'https://beta.u4.no/publications';
  const query = '*[_type in ["publication"]]';
  client.listen(query).subscribe(async (event) => {
    const { transition, result = {}, mutations = [] } = event;
    if (transition !== 'update') {
      // not an update event, do nothing
      return;
    }
    if (!some(mutations, mut => mut.createOrReplace)) {
      /**
       * The update event did not contain a createOrReplace (publish) modification,
       * this happens when we upload pdfs from this process. Doing nothing so
       * that we avoid infinite loops.
       */
      return;
    }
    if (result.legacypdf) {
      console.log('Publication has legacypdf attached. Skipping build pdf for it');
      return;
    }
    const { slug = {} } = result;
    if (!slug.current) {
      console.warn('No slug defined for document title', result.title);
      return;
    }
    const url = `${siteUrl}/${slug.current}`;
    console.log(`Rendering pdf for ${url}`);
    const pdfFilename = `${slug.current}.pdf`;
    try {
      const axiosResponse = await buildPDF({ url, title: pdfFilename });
      console.log('DocRaptor responded positively with pdf data');
      await writePDFBufferToFile({ dataStream: axiosResponse.data, filename: pdfFilename });
      console.log('Wrote file to disk. Start uploading file to Sanity');
      await uploadPDF({ targetDocument: result, pdfFilename });
      console.log(`Built and updated pdf for document: ${result.title}.`);
    } catch (e) {
      console.log('buildPDF failed for:', pdfFilename);
      console.log('Error was', e);
    }
  });
}

startPdfWorker();
