require('dotenv').config();
const axios = require('axios');
const sanityClient = require('@sanity/client');

/**
 * Purpose: To be used by frontend/server.js, send pdf file to browser
 */

function getPdfUrl(data) {
  if (data && data.pdfFile && data.pdfFile.asset && data.pdfFile.asset.url) {
    return data.pdfFile.asset.url;
  }
  if (data && data.legacypdf && data.legacypdf.asset && data.legacypdf.asset.url) {
    return data.legacypdf.asset.url;
  }
  return false;
}

async function publicationPdfHandler(req, res) {
  const { slug = '' } = req.params;

  try {
    const client = sanityClient({
      projectId: '1f1lcoov',
      dataset: 'production',
      token: process.env.SANITY_TOKEN,
      useCdn: true,
    });
    const queryFunc = slug => ({
      sanityQuery:
        '*[slug.current == $slug][0]{title,pdfFile{asset->{url}},legacypdf{asset->{url}}}',
      param: { slug },
    });

    const { sanityQuery, param = {} } = queryFunc(slug);
    const sanityResults = await client.fetch(sanityQuery, param);

    if (!sanityResults) {
      console.warn('Sanity returned nothing', sanityResults);
      throw new Error('No content found');
    }

    const data = Array.isArray(sanityResults) ? [...sanityResults] : { ...sanityResults };

    const pdfUrl = getPdfUrl(data);
    if (!pdfUrl) throw new Error('No pdf found');

    const response = await axios({
      method: 'get',
      url: pdfUrl,
      responseType: 'stream',
    });
    const stream = response.data;
    stream.on('end', () => res.end());
    stream.pipe(res);
  } catch (e) {
    console.error('Error', e);
    res.send('Error: Was not able to load pdf');
  }
}

module.exports = { publicationPdfHandler };
