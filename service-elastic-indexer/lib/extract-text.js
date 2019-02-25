const textract = require('textract');
const util = require('util');

async function extractText({ pathOrUrl, reThrowOnFail = false }) {
  const fromUrl = util.promisify(textract.fromUrl);
  const fromFileWithPath = util.promisify(textract.fromFileWithPath);
  try {
    if (pathOrUrl.startsWith('http')) {
      return await fromUrl(pathOrUrl);
    }
    return await fromFileWithPath(pathOrUrl);
  } catch (err) {
    console.error(`Failed to extract text from: ${pathOrUrl}`, err.message);
    if (reThrowOnFail) {
      throw new Error(`Rethrown extract text error reading: ${pathOrUrl}`);
    }
  }
}

if (require.main === module) {
  const main = async () => {
    const path =
      './anti-corruption-policy-making-in-practice-what-can-be-learned-for-implementing-article-5-of-uncac.pdf';
    const url =
      'https://cdn.sanity.io/files/1f1lcoov/production/6910c3c878955f258619a6f5d4b8762e0aeb3374.pdf';
    const text = await extractText({ pathOrUrl: url });
    console.log(text);
  };
  main();
} else {
  module.exports = {
    extractText,
  };
}
