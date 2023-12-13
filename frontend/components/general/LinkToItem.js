import Link from 'next/link';
import PropTypes from 'prop-types';
import buildUrl from '../../helpers/buildUrl';

const LinkToItem = ({ url = '', type = '', _type = '', slug = '', children }) => {
  // Handle both type and _type as possible input props. Ideally,
  // we only want to use type.
  const actualType = type || _type;
  return <Link href={url || buildUrl({ _type: actualType, slug })} legacyBehavior>{children}</Link>;
};

LinkToItem.propTypes = {
  type: PropTypes.string,
  slug: PropTypes.oneOfType([
    PropTypes.shape({
      current: PropTypes.string,
    }),
    PropTypes.string,
  ]).isRequired,
  children: PropTypes.element.isRequired,
};

export default LinkToItem;
