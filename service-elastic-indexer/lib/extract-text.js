const textract = require('textract');
const util = require('util');

async function extractText({ pathOrUrl, reThrowOnFail = false }) {
  // create promisified extract function based on what function we need to use.
  const extract = util.promisify(pathOrUrl.startsWith('http') ? textract.fromUrl : textract.fromFileWithPath);
  try {
    return cleanText(await extract(pathOrUrl));
  } catch (err) {
    console.error(`Failed to extract text from: ${pathOrUrl}`, err.message);
    if (reThrowOnFail) {
      throw new Error(`Rethrown extract text error reading: ${pathOrUrl}`);
    }
  }
}

// Many pdfs have table of contents with multiple '......', we remove that.
function cleanText(str = '') {
  return str.replace(/\.{4,}/gi, '');
}

if (require.main === module) {
  const main = async () => {
    const path = './extract-text.test-data.pdf';
    // const url =
    //   'https://cdn.sanity.io/files/1f1lcoov/production/6910c3c878955f258619a6f5d4b8762e0aeb3374.pdf';
    const text = await extractText({ pathOrUrl: path });
    console.log(text);
  };
  main();
} else {
  module.exports = {
    extractText,
  };
}
