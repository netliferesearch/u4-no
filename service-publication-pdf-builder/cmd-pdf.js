require('dotenv').config();
const { buildPDF, writePDFBufferToFile } = require('./pdf-lib');

const downloadPDF = async ({ url, pdfFilename }) => {
  const axiosResponse = await buildPDF({ url, title: pdfFilename });
  console.log('DocRaptor responded positively with pdf data');
  await writePDFBufferToFile({ dataStream: axiosResponse.data, filename: pdfFilename });
  console.log('Wrote file to disk. Start uploading file to Sanity');
};

const doPDFTest = async () => {
  const url = process.argv[2];
  if (!url) {
    console.error('Please provide url to site to make into pdf');
    process.exit(1);
  }
  try {
    await downloadPDF({ url, pdfFilename: 'test.pdf' });
  } catch (e) {
    console.error('Failed to build pdf for url:', url, e);
  }
};
doPDFTest();
