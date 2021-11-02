import LinkToItem from './general/LinkToItem';

const RecommendedResource = ({
  _id = '',
  lead = '',
  title = '',
  _type = '',
  slug = {},
  publicationType = false,
  articleType = false,
}) => (
  <LinkToItem type={_type} slug={slug}>
    <a className="c-simple-mosaic__item">
      <div className="c-simple-mosaic__meta">
        {publicationType ? publicationType.title : articleType.title}
      </div>
      <div className="c-simple-mosaic__title">{title}</div>
    </a>
  </LinkToItem>
);

const RecommendedResources = ({ resources = [] }) => (
  <div className="c-simple-mosaic">
    {resources.slice(0, 3).map(({ _id, ...rest }) => (
      <RecommendedResource key={_id} {...rest} />
    ))}
  </div>
);

export default RecommendedResources;
