import React from 'react';
import { RelatedSimple } from '../related-simple/RelatedSimple';
import { Partners } from '../partners/Partners';
import { SidebarItem } from '../sidebar-item/SidebarItem';
import { AuthorListBasic } from '../../publication/AuthorListBasic';
import { Topics } from '../topics/Topics';

export const ArticleSidebar = ({ data }) => {
  const {
    publicationType = {},
    authors = null,
    editors = null,
    partners = null,
    recommendedResources = null,
    relatedResources = null,
    topics = null,
  } = data;
  
  return (authors || editors || partners || recommendedResources || relatedResources || topics) &&
    <div className="c-article-sidebar">
      {authors && 
        <SidebarItem label="By">
          <AuthorListBasic authors={authors} />
        </SidebarItem>
      }
      {editors && 
        <SidebarItem
          label={`${publicationType._id === 'pubtype-3' ? 'Reviewed by' : 'Series editor'}`}
        >
          <AuthorListBasic authors={editors} />
        </SidebarItem>
      }
      {(partners ||
        publicationType?._id === 'pubtype-3' ||
        publicationType?._id === '080dc28c-9d5e-4c14-972f-73f83a206b92') &&
        <SidebarItem label="In collaboration with">
          <Partners partners={partners} publicationType={publicationType} />
        </SidebarItem>
      }
      {topics &&
        <SidebarItem label="Topics">
          <Topics title={false} topics={topics} hr={false} />
        </SidebarItem>
      }
      {(recommendedResources || relatedResources) &&
        <SidebarItem label="Related">
          <RelatedSimple
            items={recommendedResources ? recommendedResources : relatedResources}
          />
        </SidebarItem>
      }
    </div>
  };
