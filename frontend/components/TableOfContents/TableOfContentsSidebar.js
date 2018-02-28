import React from 'react';
import TableOfContentsBase from './TableOfContentsBase';

const TableOfContentsSidebar = ({alwaysFollow, content}) => (
  <div
    className={`c-article-nav-sidebar ${alwaysFollow ? 'c-article-nav-sidebar--fixed' : ''}`}
  >
    <TableOfContentsBase content={content} />
  </div>
)

export default TableOfContentsSidebar
