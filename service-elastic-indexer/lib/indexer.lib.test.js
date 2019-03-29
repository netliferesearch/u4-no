const path = require('path');
const {
  processPublication,
  loadSanityDataFile,
  initExpand,
  findLegacyPdfContent,
  blocksToText,
} = require('./indexer.lib');
const publicationExample = require('./test-data-publication.json');
const publicationExampleWithLegacyPdf = require('./test-data-publication-with-legacy-pdf');

let allDocuments = [];
beforeAll(() => {
  allDocuments = loadSanityDataFile(path.join(__dirname, '../sanity-export')).documents;
});

afterAll(() => {
  allDocuments = null;
});

test('elasticsearch: able to process publication', async () => {
  const result = await processPublication({
    document: publicationExample,
    allDocuments,
  });
  expect(result.publicationType).toMatchObject({
    _id: 'pubtype-2',
    _type: 'publicationType',
    _updatedAt: '2018-02-22T08:16:45Z',
    title: 'U4 Issue',
  });
  expect(result.keywords[0]).toBe('anti-corruption reforms');
});

test('elasticsearch: is able to expand reference', async () => {
  const expand = await initExpand(allDocuments);
  const result = expand({ references: publicationExample.authors });
  expect(result[0]).toMatchObject({
    _createdAt: '2018-12-17T10:39:20Z',
    _id: '851327b6-77e0-4958-9613-1490624f73e0',
    _key: '4106bbd33b2f',
    _rev: 'Sln1mToh8ZDMZr1ZTPCMbV',
    _type: 'person',
    _updatedAt: '2018-12-17T10:39:20Z',
    firstName: 'Jacqui',
    surname: 'Baker',
  });
});

test('elasticsearch: is able to convert text content', async () => {
  const text = blocksToText(publicationExample.content);
  expect(typeof text === 'string' && text.length > 100).toBeTruthy();
});
