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
          { label: 'Anti-corruption helpdesk', slug: '/helpdesk' },
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
          { _id: 'frontpage', label: 'People', slug: '/the-team' },
          // { label: 'Partner Information', slug: '/u4-partner-agencies' },
        ],
      },
      {
        subtitle: 'Who we work with',
        slug: '/who-we-work-with',
        type: 'work-with',
        items: [
          // {_id: 'u4-partner-agencies', label: 'Funding Partners', slug: '/u4-partner-agencies' },
          // {_id: 'the-team', label: 'Expert Network', slug: '/the-team' },
          { _id: 'frontpage', label: 'Anti-corruption helpdesk', slug: '/helpdesk' },
        ],
      },
      {
        subtitle: 'General enquiries',
        items: [{ label: 'Contact', slug: '/contact' }],
      },
    ],
  },

  {
    label: 'Search',
    id: 'search',
  },
];
