import axios from 'axios';
const path = require('path');
const fs = require('fs');
const os = require('os');
const { writePDFBufferToFile } = require('../../../../service-publication-pdf-builder/pdf-lib');

const tmpDir = os.tmpdir();

export const OPTIONS = async request => {
  return new Response(null, {
    status: 200,
  });
};

export async function GET(request) {
  const url = new URL(request.url);
  const docId = url.searchParams.get('docId');
  // console.log('Generating PDF for docId:', docId);

  try {
    // generate pdf
    const pdfFilename = `${docId}.pdf`;
    const fullPathFilename = path.join(tmpDir, pdfFilename);
    const response = await axios(pdfConfig({ id: docId, title: pdfFilename, test: false }));
    // console.log('Generated PDF', pdfFilename);

    // save file
    await writePDFBufferToFile({ dataStream: response.data, filename: fullPathFilename });
    // console.log('File saved to disk', pdfFilename);

    // send file as response
    const fileBuffer = fs.readFileSync(fullPathFilename);
    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    // console.log('Response sent to client', pdfFilename);

    return new Response(fileBuffer, { headers });
  } catch (error) {
    console.error('Error generating or uploading PDF:', error);
    return new Response('Error generating or uploading PDF', { status: 500 });
  }
}

const pdfConfig = ({
  id = '',
  title = 'output',
  url = `https://preview.u4.no/printpreview`,
  test = false,
}) => {
  const token = process.env.DOCRAPTOR_API_KEY;
  const baseurl = new URL(url).origin;
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
        document_url: `${url}/${id}`,
        type: 'pdf',
        name: title,
        test: test,
        pipeline: '10.1',
        prince_options: {
          baseurl: 'https://www.u4.no', // URL to use for generating absolute URLs for assets from relative URLs
          profile: 'PDF/UA-1', // create accessibility tags
          // media: "screen", // use screen styles instead of print styles
        },
      },
    },
    responseType: 'stream',
  };
};
