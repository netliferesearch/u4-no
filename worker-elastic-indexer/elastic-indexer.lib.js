const fs = require('fs');
const path = require('path');

// make sanity publication ready to be ingested by elasticsearch.
function processPublication({ document: doc, allDocuments }) {
  if (doc._type !== 'publication') {
    return doc;
  }
  return {
    // by default we add all Sanity fields to elasticsearch.
    ...doc,
    // then we override some of those fields with processed data.
    content: blocksToText(doc.content || []),
    authors: expandReferences({ references: doc.authors || [], allDocuments }).map(({ _key, firstName, surname }) => ({
      _key,
      name: `${firstName} ${surname}`,
    })),
    editors: expandReferences({ references: doc.editors || [], allDocuments }).map(({ _key, firstName, surname }) => ({
      _key,
      name: `${firstName} ${surname}`,
    })),
    publicationType: expandReference({
      reference: doc.publicationType,
      allDocuments,
    }),
    keywords: expandReferences({ references: doc.keywords || [], allDocuments }),
  };
}

function loadSanityDataFile(filePath = './data.ndjson') {
  return fs
    .readFileSync(path.join(__dirname, filePath), { encoding: 'UTF-8' })
    .split('\n')
    .filter(str => str)
    .map(JSON.parse);
}

function expandReferences({ references = [], allDocuments = [] }) {
  return references.map(reference => expandReference({ reference, allDocuments }));
}

function expandReference({ reference: { _key, _ref = '' }, allDocuments = [] }) {
  const foundDoc = allDocuments.find(({ _id }) => _id === _ref);
  if (foundDoc) {
    return { ...foundDoc, ...(_key ? { _key } : {}) };
  }
  return null;
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
  expandReferences,
  loadSanityDataFile,
};
