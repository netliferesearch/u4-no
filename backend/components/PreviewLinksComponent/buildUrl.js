const buildUrl = ({ _type = 'notype', slug = {} }) => {
  const actualSlug = slug.current || slug;
  if (_type === 'publication') {
    return `/publications/${actualSlug}`;
  } else if (_type === 'topics') {
    return `/topics/${actualSlug}`;
  } else if (_type === 'article') {
    return `/${actualSlug}`;
  } else if (_type === 'person') {
    return `/the-team/${actualSlug}`;
  } else if (_type === 'frontpage') {
    return `/${actualSlug}`;
  } else if (_type === 'course') {
    return `/courses/${actualSlug}`;
  } else if (_type === 'asset') {
    return `/assets/${actualSlug}`;
  } else if (_type === 'term') {
    return `/terms#${actualSlug}`;
  } else if (_type === 'people') {
    return `/the-team`;
  }
  return actualSlug;
};

const previewUrl = ({ _type = '', _id = '' }) => {
  
  if (_type === 'publication') {
    return `preview/publications/${_id}`;
  } else if (_type === 'topics') {
    return `preview/topics/${_id}`;
  } else if (_type === 'article') {
    return `preview/articles/${_id}`;
  } else if (_type === 'person') {
    return `preview/the-team/${_id}`;
  } else if (_type === 'frontpage') {
    return `preview/frontpages/${_id}`;
  } else if (_type === 'course') {
    return `preview/courses/${_id}`;
  } else if (_type === 'asset') {
    return `preview/assets/${_id}`;
  } else if (_type === 'term') {
    return `preview/terms/#${_id}`;
  }
  return `preview/${_type}/${_id}`;
};

export { buildUrl, previewUrl }
