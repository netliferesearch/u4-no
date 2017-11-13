const routes = (module.exports = require('next-routes')());

routes
  .add('main.index', '/')
  .add('publication.shortVersion', '/publications/:slug/shortversion')
  .add('publication.entry', '/publications/:slug')
  .add('publication.print', '/publications/:slug/print')
  .add('publication.index', '/publications')
  .add('topic.article', '/topics/:slug/:topicPart')
  .add('topic.entry', '/topics/:slug')
  .add('topic.index', '/topics')
  .add('glossary.index', '/terms')
  .add('persons.index', '/the-team')
  .add('persons.entry', '/the-team/:slug')
  .add('search.index', '/search')
  .add('search.entry', '/search')
  .add('workshops.entry', '/workshops/:slug')
  .add('service.workshops', '/workshops-and-events')
  .add('service.online-courses', '/online-courses')
  .add('service.helpdesk', '/helpdesk')
  .add('service.about', '/about-u4')
  .add('general.article', '/:slug');
