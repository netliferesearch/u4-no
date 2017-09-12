const routes = (module.exports = require('next-routes')());

routes
  .add('main.index', '/')
  .add('publication.entry', '/publications/:publication')
  .add('publication.index', '/publications')
  .add('topic.entry', '/topics/:slug')
  .add('topic.index', '/topics')
  .add('general.article', '/article/:slug');
