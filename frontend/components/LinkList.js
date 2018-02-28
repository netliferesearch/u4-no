import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import { Link } from '../routes';
import { ArrowRight } from '../components/icons';

const classes = BEMHelper({
  name: 'link-list',
  prefix: 'c-',
});

const arrayify = (content) => {
  if (!Array.isArray(content)) return [content];
  return content;
};

const LinkList = ({ title = '', content = [], otherClasses = '' }) => (
  <ul {...classes(null, null, otherClasses)}>
    {title && <span>{title}</span>}
    { arrayify(content).map(({ link = '', title: linkList = '' }, index) => (
      <li key={index + linkList.trim()} {...classes('item')}>
        <Link to={link}>
          <a {...classes('link')}>
            {linkList} <ArrowRight {...classes('icon')} />
          </a>
        </Link>
      </li>
    ))}
  </ul>
);

LinkList.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]).isRequired,
  otherClasses: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
};

LinkList.defaultProps = {
  otherClasses: '',
};

export default LinkList;
