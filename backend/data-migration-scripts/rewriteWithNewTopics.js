const topicMapping = require('./topicMapping.json').reduce((acc, publication) => {
  acc[`theme-${publication.oldId}`] = publication;
  return acc;
}, {});
const split = require('split');

process.stdin.pipe(split(JSON.parse, null, { trailing: false })).on('data', (publication) => {
  const { topics = '' } = publication;
  const oldTopics = topics.split(',').filter(topic => topic);
  publication.topics = oldTopics.map((oldTopicId) => {
    const newTopic = topicMapping[oldTopicId];
    if (newTopic) {
      return { _type: 'reference', _ref: newTopic._id };
    }
  });
  process.stdout.write(`${JSON.stringify(publication)}\n`);
});
