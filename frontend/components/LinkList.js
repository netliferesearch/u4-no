import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import { LinkToItem } from './';
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
    {arrayify(content).map(({
 _id = '', _type = '', slug = '', title = '',
}, index) => (
  <li key={_id} {...classes('item')}>
    {slug ? (
      <LinkToItem type={_type} slug={slug}>
        <a {...classes('link')}>
          {title} <ArrowRight {...classes('icon')} />
        </a>
      </LinkToItem>
        ) : (
          { title }
        )}
  </li>
    ))}
  </ul>
);

LinkList.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]).isRequired,
  otherClasses: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

LinkList.defaultProps = {
  otherClasses: '',
};

export default LinkList;
