const routes = (module.exports = require('next-routes')());

routes
  .add('main.index', '/')
  .add('publication.entry', '/publication(|s)/:slug')
  .add('publication.index', '/publication(|s)')
  .add('topic.article', '/topics/:slug/:topicPart')
  .add('topic.entry', '/topics/:slug')
  .add('topic.index', '/topics')
  .add('general.article', '/article/:slug')
  .add('search.index', '/search')
  .add('online-training.entry', '/online-training/:id')
  .add('online-training.index', '/online-training')
  .add('workshops.index', '/workshops')
  .add('workshops.entry', '/workshops/:slug')
  .add('service.entry', '/services/:slug');
