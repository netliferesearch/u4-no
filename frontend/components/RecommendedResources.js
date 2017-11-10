import buildUrl from '../helpers/buildUrl';
import { Link } from '../routes';

const RecommendedResource = ({
  _id = '',
  lead = '',
  _type = '',
  target,
  publicationType = {},
  title = target.title,
  slug = target.slug,
}) => {
  const type = publicationType.title ? `${_type}: ${publicationType.title}` : _type;
  return (
    <div className="c-simple-mosaic__item">
      <div>{type}</div>
      <div className="c-simple-mosaic__title">{title}</div>
      <Link route={buildUrl({ _type, slug })}>
        <a className="c-simple-mosaic__cta">Read more here</a>
      </Link>
    </div>
  );
};

const RecommendedResources = ({ relatedContent = [] }) => (
  <div className="c-simple-mosaic">
    {relatedContent
      .slice(0, 3)
      .map(({ _id, ...rest }) => <RecommendedResource key={_id} {...rest} />)}
  </div>
);

export default RecommendedResources;
