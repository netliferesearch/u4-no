
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



export default function resolveProductionUrl(document) {
  return ( document._id.startsWith('drafts.')
    ? `https://beta.u4.no/preview/${document._type}/${document._id}`
    : 'https://beta.u4.no' + buildUrl( document ) );
}
