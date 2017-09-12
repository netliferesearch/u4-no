const routes = (module.exports = require('next-routes')());

routes
  .add('main.index', '/')
  .add('publication.entry', '/publications/:slug')
  .add('publication.index', '/publications')
  .add('topic.entry', '/topics/:slug')
  .add('topic.index', '/topics')
  .add('general.article', '/article/:slug');
