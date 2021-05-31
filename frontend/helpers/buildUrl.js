export default ({ _type = 'notype', slug = {} }) => {
  const actualSlug = slug.current || slug;
  if (_type === 'publication') {
    return `/publications/${actualSlug}`;
  } else if (_type === 'shortVersionPublication') {
    return `/publications/${actualSlug}/shortversion`;
  } else if (_type === 'topics') {
    return `/topics/${actualSlug}`;
  } else if (_type === 'topicsBasics') {
    return `/topics/${actualSlug}/basics`;
  } else if (_type === 'topicsAgenda') {
    return `/topics/${actualSlug}/agenda`;
  } else if (_type === 'article') {
    return `/${actualSlug}`;
  } else if (_type === 'person') {
    return `/the-team/${actualSlug}`;
  } else if (_type === 'frontpage') {
    return `/${actualSlug}`;
  } else if (_type === 'course') {
    return `/courses/${actualSlug}`;
  } else if (_type === 'event') {
    return `/events/${actualSlug}`;
  } else if (_type === 'asset') {
    return `/assets/${actualSlug}`;
  } else if (_type === 'term') {
    return `/terms#${actualSlug}`;
  } else if (_type === 'people') {
    return `/the-team`;
  }
  return actualSlug;
};
