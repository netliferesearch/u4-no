const routes = (module.exports = require('next-routes')());

routes
  .add('main.index', '/')
  .add('publication.entry', '/publications/:id')
  .add('publication.index', '/publications')
  .add('topic.article', '/topics/:id/:topicPart')
  .add('topic.entry', '/topics/:id')
  .add('topic.index', '/topics')
  .add('general.article', '/article/:id');
