const {
  processPublication,
  loadSanityDataFile,
  expandReferences,
} = require('./elastic-indexer.lib');
const publicationExample = require('./test-data-publication');

let allDocuments = [];
beforeAll(() => {
  allDocuments = loadSanityDataFile('./test-data.ndjson');
});

afterAll(() => {
  allDocuments = null;
});

test('elasticsearch: able to process publication', async () => {
  const result = processPublication({ document: publicationExample, allDocuments });
  expect(result.publicationType).toMatchObject({
    _id: 'pubtype-2',
    _type: 'publicationType',
    _updatedAt: '2018-02-22T08:16:45Z',
    title: 'U4 Issue',
  });
  expect(result.keywords).toEqual({
    _id: 'pubtype-2',
    _type: 'publicationType',
    _updatedAt: '2018-02-22T08:16:45Z',
    title: 'U4 Issue',
  });
});

test('elasticsearch: is able to expand reference', async () => {
  const result = expandReferences({ references: publicationExample.authors, allDocuments });
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
