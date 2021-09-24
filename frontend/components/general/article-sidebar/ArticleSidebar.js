import React from 'react';
import { RelatedSimple } from '../related-simple/RelatedSimple';
import { Partners } from '../partners/Partners';
import { SidebarItem } from '../sidebar-item/SidebarItem';
import { AuthorListBasic } from '../../publication/AuthorListBasic';
import { Topics } from '../topics/Topics';

export const ArticleSidebar = ({ data }) => {
  const {
    publicationType = {},
    authors = [],
    editors = [],
    partners = [],
    recommendedResources = [],
    relatedResources = [],
    topics = [],
  } = data;
  
  return authors.length > 0 ||
    editors.length > 0 ||
    partners.length > 0 ||
    recommendedResources.length > 0 ||
    relatedResources.length > 0 ||
    topics.length > 0 ? (
    <div className="c-article-sidebar">
      {authors.length ? (
        <SidebarItem label="By">
          <AuthorListBasic authors={authors} />
        </SidebarItem>
      ) : null}
      {editors.length ? (
        <SidebarItem
          label={`${publicationType._id === 'pubtype-3' ? 'Reviewed by' : 'Series editor'}`}
        >
          <AuthorListBasic authors={editors} />
        </SidebarItem>
      ) : null}
      {partners.length > 0 ||
      publicationType._id === 'pubtype-3' ||
      publicationType._id === '080dc28c-9d5e-4c14-972f-73f83a206b92' ? (
        <SidebarItem label="In collaboration with">
          <Partners partners={partners} publicationType={publicationType} />
        </SidebarItem>
      ) : null}
      {topics.length ? (
        <SidebarItem label="Topics">
          <Topics title={false} topics={topics} hr={false} />
        </SidebarItem>
      ) : null}
      {recommendedResources.length || relatedResources.length ? (
        <SidebarItem label="Related">
          <RelatedSimple
            items={recommendedResources.length > 0 ? recommendedResources : relatedResources}
          />
        </SidebarItem>
      ) : null}
    </div>
  ) : null;
};
