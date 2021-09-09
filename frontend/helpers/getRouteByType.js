import {
  PUBLICATION,
  SEARCH_PUBLICATIONS,
  SEARCH_U4_BRIEF,
  SEARCH_U4_GUIDE,
  SEARCH_U4_HELPDESK,
  SEARCH_U4_ISSUE,
  SEARCH_U4_REPORT,
  SEARCH_U4_PRACTITIONER_EXPERIENCE_NOTE,
  U4_PRACTITIONER_EXPERIENCE_NOTE,
  U4_BRIEF,
  U4_GUIDE,
  U4_HELPDESK,
  U4_ISSUE,
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
  const itemType = item._type;
  let typeTitle = '';
  switch (itemType) {
    case 'publication':
      typeTitle =
        item.publicationType && typeof item.publicationType.title === 'string'
          ? item.publicationType.title
          : typeof item.publicationType === 'string' ? item.publicationType : 'Publication';
      break;
    case 'course':
      typeTitle = 'Online course';
      break;
    case 'event':
      switch (item.eventType) {
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
      typeTitle = 'Article';
      break;
    default:
      typeTitle = '';
  }
  return typeTitle;
};

// export const getStringsByType = item => {
//   const itemType = item._type;
//   let typeTitle = '';
//   let typeSubTitle = '';
//   let slugOfType = '';

//   switch (itemType) {
//     case 'publication':
//       typeTitle = 'Publication | ';
//       typeSubTitle =
//         item.publicationType && typeof item.publicationType.title === 'string'
//           ? item.publicationType.title
//           : '';
//       slugOfType = 'publications/';
//       break;
//     case 'course':
//       typeTitle = 'Online course';
//       typeSubTitle = '';
//       slugOfType = 'courses/';
//       break;
//     case 'event':
//       typeTitle = 'Workshop';
//       typeSubTitle = '';
//       slugOfType = '';
//       break;
//     case 'blog-post':
//       typeTitle = 'Blog post';
//       typeSubTitle = '';
//       slugOfType = 'blog/';
//       break;
//     case 'article':
//       typeTitle = 'Article';
//       // typeSubTitle = typeof item.articleType.title === 'string' ? ' | '+item.articleType.title : '';
//       typeSubTitle = '';
//       slugOfType = '';
//       break;
//     default:
//       typeTitle = '';
//       typeSubTitle = '';
//       slugOfType = '';
//   }
