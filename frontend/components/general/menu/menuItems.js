import { SEARCH_PUBLICATIONS, SEARCH } from '../../../helpers/constants';
export const menuItems = [
  {
    label: 'Research Topics',
    id: 'topics',
    headline: "Explore the full range of U4's unique research",
    items: [],
  },
  {
    label: 'Publications',
    id: 'publications',
    slug: '/publications?',
  },
  {
    label: 'The U4 Blog',
    id: 'blog',
    slug: '/blog',
  },
  {
    label: 'Learning & events',
    id: 'learning',
    headline: 'Anti-corruption training for development practitioners',
    sections: [
      {
        subtitle: 'Learning',
        items: [
          { label: 'Online courses', slug: '/online-courses' },
          { label: 'Helpdesk - Ask your question', slug: '/helpdesk' },
          { label: 'Glossary', slug: '/terms ' },
        ],
      },
      {
        subtitle: 'Events',
        items: [{ label: 'Workshops & events', slug: '/workshops-and-events' }],
      },
    ],
  },
  {
    label: 'About Us',
    id: 'about',
    headline: 'Working to reduce the harmful impact of corruption on society',
    sections: [
      {
        subtitle: 'About U4',
        slug: '/about-u4',
        type: 'about',
        items: [
          // { label: 'About us', slug: '/about-u4' },
           { _id: 'frontpage', label: 'Staff', slug: '/the-team' },
          // { label: 'Partner Information', slug: '/u4-partner-agencies' },
        ],
      },
      {
        subtitle: 'Who we work with',
        items: [
          { label: 'Funding Partners', slug: '/u4-partner-agencies' },
          { label: 'Expert Network', slug: '/the-team' },
          { label: 'Anti-Coruption helpdesk', slug: '/helpdesk' },
        ],
      },
      {
        subtitle: 'General enquiries',
        items: [{ label: 'Contact', slug: '/about-u4' }],
      },
    ],
  },

  {
    label: 'Search',
    id: 'search',
  },
];
