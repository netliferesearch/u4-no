import {
  PUBLICATION,
  SEARCH_PUBLICATIONS,
  SEARCH_U4_BRIEF,
  SEARCH_U4_GUIDE,
  SEARCH_U4_HELPDESK,
  SEARCH_U4_ISSUE,
  SEARCH_U4_PRACTITIONER_EXPERIENCE_NOTE,
  SEARCH_U4_REPORT,
  U4_BRIEF,
  U4_GUIDE,
  U4_HELPDESK,
  U4_ISSUE,
  U4_PRACTITIONER_EXPERIENCE_NOTE,
  U4_REPORT,
} from './constants';

export const getRouteByType = publicationType => {
  let href = SEARCH_PUBLICATIONS;

  switch (publicationType) {
    case PUBLICATION:
      href = SEARCH_PUBLICATIONS;
      break;
    case U4_BRIEF:
      href = SEARCH_U4_BRIEF;
      break;
    case U4_ISSUE:
      href = SEARCH_U4_ISSUE;
      break;
    case U4_HELPDESK:
      href = SEARCH_U4_HELPDESK;
      break;
    case U4_GUIDE:
      href = SEARCH_U4_GUIDE;
      break;
    case U4_REPORT:
      href = SEARCH_U4_REPORT;
      break;
    case U4_PRACTITIONER_EXPERIENCE_NOTE:
      href = SEARCH_U4_PRACTITIONER_EXPERIENCE_NOTE;
      break;
    default:
      href = SEARCH_PUBLICATIONS;
  }
  return href;
};

export const getPostType = item => {
  const itemTypeUnderscore = item._type;
  const itemType = item.type;
  let typeTitle = '';
  switch (itemTypeUnderscore || itemType) {
    case 'publication':
      typeTitle =
        item.publicationType && typeof item.publicationType.title === 'string'
          ? item.publicationType.title
          : typeof item.publicationType === 'string'
            ? item.publicationType
            : 'Publication';
      break;
    case 'course':
      typeTitle = item.mode ? `${item.mode} course` : 'Online course';
      break;
    case 'event':
      switch (item.eventType) {
        case 'event':
          typeTitle = 'Event';
          break;
        case 'eventrecording':
          typeTitle = 'Event recording';
          break;
        case 'other':
          typeTitle = 'Event';
          break;
        case 'hqworkshop':
          typeTitle = 'Workshop';
          break;
        case 'incountryworkshop':
          typeTitle = 'Workshop';
          break;
        case 'webinar':
          typeTitle = 'Webinar';
          break;
        default:
          typeTitle = 'Workshop';
      }
      break;
    case 'blog-post':
      typeTitle = 'Blog';
      break;
    case 'article':
      if (item.articleTypeTitles && item.articleTypeTitles.length > 0) {
        return item.articleTypeTitles[0];
      }
      if (item.articleTypeTitle && typeof item.articleTypeTitle === 'string') {
        return item.articleTypeTitle;
      }
      typeTitle =
        item.articleType && typeof item.articleType === 'string' ? item.articleType : 'Article';
      break;
    case 'topic':
      typeTitle = 'Topic';
      break;
    case 'topics':
      typeTitle = 'U4 Basic Guide';
      break;
    case 'collection':
      typeTitle = 'Collection';
      break;
    default:
      typeTitle = '';
  }
  return typeTitle;
};
