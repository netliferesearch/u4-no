export default ({ _type = 'notype', slug = {} }) => {
  const actualSlug = slug.current || slug;
  if (_type === 'publication') {
    return `/publications/${actualSlug}`;
  } else if (_type === 'topics') {
    return `/topics/${actualSlug}`;
  } else if (_type === 'article') {
    return `/article/${actualSlug}`;
  }
  return actualSlug;
};
