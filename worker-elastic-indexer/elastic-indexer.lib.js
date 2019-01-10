const fs = require('fs');
const path = require('path');

// make sanity publication ready to be ingested by elasticsearch.
function processPublication({ document: doc, allDocuments }) {
  if (doc._type !== 'publication') {
    return doc;
  }
  const expand = initExpand(allDocuments);
  return {
    // by default we add all Sanity fields to elasticsearch.
    ...doc,
    // then we override some of those fields with processed data.
    content: blocksToText(doc.content || []),
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

function processDocument({ document, allDocuments }) {
  if (document._type === 'publication') {
    return processPublication({ document, allDocuments });
  }
  return document;
}

function loadSanityDataFile(filePath = './data.ndjson') {
  return parseNDJSON(fs.readFileSync(path.join(__dirname, filePath), { encoding: 'UTF-8' }));
}

function parseNDJSON(str) {
  return str
    .split('\n')
    .filter(str => str)
    .map(JSON.parse);
}

/**
 * Expand Sanity references into the referenced documents.
 * Can optionally process document after being expanded
 *
 * Call initExpand with all Sanity documents, so that it can search for refences
 * there. It will return a function which you can use to expand references.
 */
function initExpand(allDocuments = []) {
  // returns a function ready to do work.
  return function expand({ reference, references = [], process = doc => doc }) {
    const expandAndProcessReference = ({ _key, _ref }) => {
      const foundDoc = allDocuments.find(({ _id }) => _id === _ref);
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
    .join('\n\n');
}

module.exports = {
  processPublication,
  initExpand,
  loadSanityDataFile,
  parseNDJSON,
  processDocument,
};
