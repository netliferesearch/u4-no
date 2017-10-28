const routes = (module.exports = require('next-routes')());

routes
  .add('main.index', '/')
  .add('publication.entry', '/publications/:slug')
  .add('publication.index', '/publications')
  .add('topic.article', '/topics/:slug/:topicPart')
  .add('topic.entry', '/topics/:slug')
  .add('topic.index', '/topics')
  .add('persons.index', '/the-team')
  .add('persons.entry', '/the-team/:slug')
  .add('search.index', '/search')
  .add('search.entry', '/search')
  .add('online-training.entry', '/online-training/:id')
  .add('online-training.index', '/online-training')
  .add('workshops.index', '/workshops')
  .add('workshops.entry', '/workshops/:slug')
  .add('service.entry', '/services/:slug')
  .add('general.article', '/:slug');

