const path = require('path');
const { generateChangelist } = require('./index-all-documents');

const newSanityDoc = {
  _id: 'pub-425',
  _createdAt: '2017-08-31T13:30:04Z',
  _type: 'publication',
  _updatedAt: '2018-02-05T14:44:35Z',
};
const updatedSanityDoc = {
  _id: 'b3c15eed-4dc6-4c0b-9602-f6b130015a41',
  _createdAt: '2018-01-15T09:19:19Z',
  _type: 'course',
  _updatedAt: '2018-12-08T07:39:14Z',
};
const unchangedSanityDoc = {
  _id: 'c79b642b-3d61-4e1b-b648-a7bdae721479',
  _createdAt: '2018-05-24T08:52:43Z',
  _type: 'article',
  _updatedAt: '2018-05-24T09:23:58Z',
};
const sanityDocuments = [newSanityDoc, updatedSanityDoc, unchangedSanityDoc];
const removedElasticDoc = {
  _index: 'u4-en-us',
  _type: 'u4-searchable',
  _id: 'pub-392',
  _score: 1,
  _source: {
    createdAt: '2017-08-31T13:30:04Z',
    updatedAt: '2018-02-05T14:44:35Z',
  },
};
const unchangedElasticDoc = {
  _index: 'u4-en-us',
  _type: 'u4-searchable',
  _id: 'c79b642b-3d61-4e1b-b648-a7bdae721479',
  _score: 1,
  _source: {
    createdAt: '2018-05-24T08:52:43Z',
    updatedAt: '2018-05-24T09:23:58Z',
  },
};
const elasticDocuments = [
  removedElasticDoc,
  unchangedElasticDoc,
  {
    _index: 'u4-en-us',
    _type: 'u4-searchable',
    _id: 'b3c15eed-4dc6-4c0b-9602-f6b130015a41',
    _score: 1,
    _source: {
      createdAt: '2018-01-15T09:19:19Z',
      updatedAt: '2018-10-08T07:39:14Z',
    },
  },
];

test('elasticsearch: properly mark docs to delete', async () => {
  const { docsToDelete } = await generateChangelist({
    sanityDocuments,
    elasticDocuments,
  });
  expect(docsToDelete).toContain(removedElasticDoc);
});

test('elasticsearch: properly mark docs to insert', async () => {
  const { docsToInsertOrUpdate } = await generateChangelist({
    sanityDocuments,
    elasticDocuments,
  });
  expect(docsToInsertOrUpdate).toContain(newSanityDoc);
});

test('elasticsearch: properly mark docs to update', async () => {
  const { docsToInsertOrUpdate } = await generateChangelist({
    sanityDocuments,
    elasticDocuments,
  });
  expect(docsToInsertOrUpdate).toContain(updatedSanityDoc);
});
