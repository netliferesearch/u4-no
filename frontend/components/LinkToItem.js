import { Link } from '../routes';

const getRoute = (type = '') => {
  if (type === 'publication') {
    return 'publication.entry-v2';
  } else if (type === 'topics') {
    return 'topic.entry';
  } else if (type === 'article') {
    return 'general.article';
  } else if (type === 'person') {
    return 'persons.entry';
  } else if (type === 'frontpage') {
    return 'general.article';
  } else if (type === 'course') {
    return 'course.entry';
  } else if (type === 'asset') {
    return 'asset.entry';
  } else if (type === 'term') {
    return 'glossary.index';
  } else if (type === 'blog-post') {
    return 'blog.entry';
  } else if (type === 'blog.index') {
    return 'blog';
  }
  return 'general.article';
};

const LinkToItem = ({
  type = false, _type = '', slug = '', children,
}) => (
  <Link route={getRoute(type || _type)} params={{ slug: slug.current ? slug.current : slug }}>
    {children}
  </Link>
);
export default LinkToItem;
