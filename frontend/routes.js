const routes = (module.exports = require('next-routes')());

routes
  .add('main.index', '/')
  .add('publication.shortVersion', '/publications/:slug/shortversion')
  .add('publication.file', '/publications/:slug/downloadasset/:legacyid')
  .add('publication.entry', '/publications/:slug')
  .add('publication.print', '/publications/:slug/print')
  .add('topic.article', '/topics/:slug/:topicPart')
  .add('topic.entry', '/topics/:slug')
  .add('topic.index', '/topics')
  .add('glossary.index', '/terms')
  .add('keywords.index', '/keywords')
  .add('persons.index', '/the-team')
  .add('persons.entry', '/the-team/:slug')
  .add('search-v2.index', '/search')
  .add('event.entry', '/events/:slug')
  .add('course.entry', '/courses/:slug')
  .add('service.workshops', '/workshops-and-events')
  .add('service.online-courses', '/online-courses')
  .add('service.helpdesk', '/helpdesk')
  .add('service.about', '/about-u4')
  .add('asset.entry', '/assets/:slug')
  .add('general.article', '/:slug');
