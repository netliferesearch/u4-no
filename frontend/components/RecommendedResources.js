import buildUrl from '../helpers/buildUrl';
import { Link } from '../routes';

const RecommendedResource = ({
  _id = '',
  lead = '',
  target: {
    title,
    _type,
    slug,
  } = {},
  publicationType = {},
}) => (
  <Link route={buildUrl({ _type, slug })}>
    <a className="c-simple-mosaic__item">
      <div style={{ textTransform: 'capitalize' }}>{_type}</div>
      <div className="c-simple-mosaic__title">{title}</div>
    </a>
  </Link>
);

const RecommendedResources = ({ relatedContent = [] }) => (
  <div className="c-simple-mosaic">
    {relatedContent
      .slice(0, 3)
      .map(({ _id, ...rest }) => <RecommendedResource key={_id} {...rest} />)}
  </div>
);

export default RecommendedResources;
