import Link from 'next/link';
import buildUrl from '../helpers/buildUrl';

const LinkToItem = ({ type: _type = '', slug = '', children }) => {
  return <Link href={buildUrl({ _type, slug })}>{children}</Link>;
};
export default LinkToItem;
