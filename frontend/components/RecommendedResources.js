import buildUrl from '../helpers/buildUrl';
import { Link } from '../routes';

const RecommendedResource = ({
  _id = '',
  lead = '',
  title = '',
  _type = '',
  slug = {},
  publicationType = false,
  articleType = false,
}) => (
  <Link route={buildUrl({ _type, slug })}>
    <a className="c-simple-mosaic__item">
      <div className="c-simple-mosaic__meta">
        {publicationType ? publicationType.title : articleType.title}
      </div>
      <div className="c-simple-mosaic__title">{title}</div>
    </a>
  </Link>
);

const RecommendedResources = ({ relatedContent = [] }) => (
  <div className="c-simple-mosaic">
    {relatedContent.slice(0, 3).map(({ _id, ...rest }) => (
      <RecommendedResource key={_id} {...rest} />
    ))}
  </div>
);

export default RecommendedResources;
