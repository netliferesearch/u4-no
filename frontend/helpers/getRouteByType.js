import {
  PUBLICATION,
  SEARCH_PUBLICATIONS,
  SEARCH_U4_BRIEF,
  SEARCH_U4_HELPDESK,
  SEARCH_U4_ISSUE,
  U4_BRIEF,
  U4_HELPDESK,
  U4_ISSUE,
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
    default:
      href = SEARCH_PUBLICATIONS;
  }
  return href;
};
