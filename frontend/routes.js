const routes = (module.exports = require('next-routes')());

routes
  .add('main.index', '/')
  .add('publication.entry', '/publications/:slug')
  .add('publication.index', '/publications')
  .add('topic.article', '/topics/:slug/:topicPart')
  .add('topic.entry', '/topics/:slug')
  .add('topic.index', '/topics')
  .add('general.article', '/article/:slug')
  .add('search.index', '/search')
  .add('search.result', '/search/:slug')
  .add('online-training.entry', '/online-training/:id');
