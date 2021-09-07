import React from 'react';
import { RelatedSimple } from '../../RelatedSimple';
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
  return data ? (
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
      {partners.length > 0 || publicationType._id === 'pubtype-3' ? (
        <SidebarItem label="In colaboration with">
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
