const fs = require('fs');
const path = require('path');
const { extractText } = require('./elastic-extract-text');

/**
 * Purpose: Find corresponding pdf file and load its contents
 */
let files = null;
function findLegacyPdfContent({ document }) {
  if (!document.legacypdf) {
    return null;
  }
  const fileFolderPath = path.join(__dirname, 'sanity-export/files');
  if (!files) {
    files = fs.readdirSync(fileFolderPath);
  }
  try {
    const fileId = /file-(.*)/gi.exec(document.legacypdf.asset._ref)[1];
    let foundFile = files.find(fileName => fileName.indexOf(fileId) !== -1);
    if (!foundFile.endsWith('.pdf')) {
      fs.copyFileSync(
        path.join(fileFolderPath, foundFile),
        path.join(fileFolderPath, `${foundFile}.pdf`),
      );
      foundFile = `${foundFile}.pdf`;
    }
    if (foundFile) {
      return extractText(path.join(fileFolderPath, foundFile));
    }
    return null;
  } catch (err) {
    console.log('Failed to load legacy pdf data', err);
    return null;
  }
}

// make sanity publication ready to be ingested by elasticsearch.
async function processPublication({ document: doc, allDocuments }) {
  if (doc._type !== 'publication') {
    return doc;
  }
  const expand = initExpand({ documents: allDocuments });
  const legacyPDFContent = await findLegacyPdfContent({ document, allDocuments });
  return {
    // by default we add all Sanity fields to elasticsearch.
    ...doc,
    // then we override some of those fields with processed data.
    content: legacyPDFContent || blocksToText(doc.content || []),
    authors: expand({
      references: doc.authors,
      process: ({ _key, firstName, surname }) => ({
        _key,
        name: `${firstName} ${surname}`,
      }),
    }),
    editors: expand({
      references: doc.editors,
      process: ({ _key, firstName, surname }) => ({
        _key,
        name: `${firstName} ${surname}`,
      }),
    }),
    publicationType: expand({
      reference: doc.publicationType,
    }),
    keywords: expand({ references: doc.keywords || [] }),
  };
}

async function processDocument({ document, allDocuments }) {
  if (document._type === 'publication') {
    return processPublication({ document, allDocuments });
  }
  return document;
}

function loadSanityDataFile(folderPath = 'sanity-export') {
  if (!folderPath) {
    throw new Error('loadSanityDataFile: Please provide a path.');
  }
  const documents = parseNDJSON(fs.readFileSync(path.join(__dirname, folderPath, 'data.ndjson'), { encoding: 'UTF-8' }));
  const assets = parseNDJSON(fs.readFileSync(path.join(__dirname, folderPath, 'assets.json'), { encoding: 'UTF-8' }));
  return { documents, assets };
}

function parseNDJSON(str) {
  return str
    .split('\n')
    .filter(str => str)
    .map(JSON.parse);
}

function getIndexName({ _type, language = 'en_US' }) {
  return `u4-${language}-${_type}`.toLowerCase().replace(/_/gi, '-');
}

/**
 * Expand Sanity references into the referenced documents.
 * Can optionally process document after being expanded
 *
 * Call initExpand with all Sanity documents, so that it can search for refences
 * there. It will return a function which you can use to expand references.
 */
function initExpand({ documents, assets }) {
  // returns a function ready to do work.
  return function expand({ reference, references = [], process = doc => doc }) {
    const expandAndProcessReference = ({ _key, _ref = '' }) => {
      const foundDoc = documents.find(({ _id }) => _id === _ref);
      if (foundDoc) {
        return process({ ...foundDoc, ...(_key ? { _key } : {}) });
      }
      return null;
    };
    if (reference) {
      return expandAndProcessReference(reference);
    }
    return references.map(expandAndProcessReference);
  };
}

// Convert Sanity's portable text into plain string.
function blocksToText(blocks, opts = {}) {
  const defaults = {};
  const options = Object.assign({}, defaults, opts);
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`;
      }

      return block.children.map(child => child.text).join('');
    })
    .join(' ');
}

module.exports = {
  processPublication,
  initExpand,
  loadSanityDataFile,
  parseNDJSON,
  processDocument,
  getIndexName,
  findLegacyPdfContent,
};
