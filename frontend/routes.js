const routes = (module.exports = require('next-routes')());

routes
  .add('main.index', '/')
  .add('publication.entry', '/publications/:slug')
  .add('publication.index', '/publications')
  .add('topic.article', '/topics/:id/:topicPart')
  .add('topic.entry', '/topics/:id')
  .add('topic.index', '/topics')
  .add('general.article', '/article/:id')
  .add('online-training.entry', '/online-training/:id');
