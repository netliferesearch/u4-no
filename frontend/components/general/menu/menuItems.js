/*
  menu items are hard coded here instead of querying on each request
  original sanity query:
  const sanityQuery = `{
    "topics": *[_type == "topics" && !(_id in path('drafts.**'))] | order(title){_id, title, slug{current}},
    "aboutResources": *[slug.current == "about-u4-new"][0]{ resources[]->{_id, "label": title, slug{current}} },
    "workWithResources": *[slug.current == "who-we-work-with"][0]{ resources[]->{_id, "label": title, slug{current}} }
  }`;
*/

export const menuItems = [
  {
    label: 'Research Topics',
    id: 'topics',
    headline: "Explore the full range of U4's unique research",
    items: [
      {
        _id: '07c3e2d6-98d9-4379-9424-932461660fb4',
        slug: { current: 'anti-corruption-institutions' },
        title: 'Anti-corruption agencies',
      },
      {
        _id: '61a23965-d501-46cf-8376-ddc1d4fed12c',
        slug: { current: 'anti-corruption-basics' },
        title: 'Anti-corruption basics',
      },
      {
        _id: '08eb17eb-7fb3-4a7a-a01c-a4d1b09ac312',
        slug: { current: 'anti-corruption-courts' },
        title: 'Anti-corruption courts',
      },
      {
        _id: 'e33da72c-775b-492c-b159-91e865072844',
        slug: { current: 'auditing-and-financial-control' },
        title: 'Auditing and financial control',
      },
      {
        _id: '1adb5c6e-8428-4adb-b091-257626fdaa03',
        slug: { current: 'budget-process' },
        title: 'Budget process',
      },
      {
        _id: '6244f600-0fcc-423b-b271-361383dc7de0',
        slug: { current: 'civil-society' },
        title: 'Civil society',
      },
      {
        _id: '65aba16e-392e-4f65-9ecb-7205edb86be7',
        slug: { current: 'climate-change' },
        title: 'Climate change',
      },
      {
        _id: '01dd625e-bd28-4d78-9de1-af8c307534d5',
        slug: { current: 'corruption-risk-management' },
        title: 'Corruption risk management',
      },
      {
        _id: '6852dca9-7645-4429-9839-a7718c4e7ced',
        slug: { current: 'covid-19-and-corruption' },
        title: 'Covid-19 and corruption',
      },
      {
        _id: 'f6df5f07-1d6c-424c-befd-1fc7697452c5',
        slug: { current: 'development-cooperation' },
        title: 'Development cooperation',
      },
      {
        _id: '49ce1599-4d3c-4e5f-b441-8528fb95abb7',
        slug: { current: 'education' },
        title: 'Education',
      },
      {
        _id: '6de5d323-6e63-417a-b396-732abf780789',
        slug: { current: 'measurement-and-evaluation' },
        title: 'Evaluation and measurement',
      },
      { _id: '929285b7-7036-44fd-b0bc-bca6f1bb5c78', slug: { current: 'gender' }, title: 'Gender' },
      { _id: '464e6452-36fd-4862-a35b-1dc2b04241b8', slug: { current: 'health' }, title: 'Health' },
      {
        _id: '05a51cc4-97a1-4753-b566-6fc49b61c1de',
        slug: { current: 'human-rights' },
        title: 'Human rights',
      },
      {
        _id: '80891b79-a3b1-4747-bdf9-3ad6a4497bb0',
        slug: { current: 'illicit-financial-flows' },
        title: 'Illicit financial flows',
      },
      {
        _id: '217db47a-ecd8-4ed5-b446-52cc674bff0b',
        slug: { current: 'justice-sector' },
        title: 'Justice sector',
      },
      {
        _id: 'adfb2423-e4e4-4efb-b7d7-30a5ee7ad2c9',
        slug: { current: 'migration' },
        title: 'Migration',
      },
      {
        _id: 'a8f6ad54-3a41-4ceb-b361-4febfb6fe67d',
        slug: { current: 'natural-resources-and-energy' },
        title: 'Natural resources and energy',
      },
      {
        _id: 'fd9ecb76-1e8d-4cc4-a073-cab99253d01e',
        slug: { current: 'oil-gas-and-mining' },
        title: 'Oil, gas, and mining',
      },
      {
        _id: '7aef31b0-2fee-4495-b244-0f5abe831bab',
        slug: { current: 'political-corruption' },
        title: 'Politics of anti-corruption',
      },
      {
        _id: 'fe9002b9-a333-4461-aabc-cbe3c8dfb92f',
        slug: { current: 'private-sector' },
        title: 'Private sector',
      },
      {
        _id: '3820f39d-d767-4b75-97e9-24b13ade8435',
        slug: { current: 'procurement' },
        title: 'Procurement',
      },
      {
        _id: '6cbebe25-8877-4e74-bb4c-995241cb57e9',
        slug: { current: 'public-financial-management' },
        title: 'Public financial management',
      },
      {
        _id: '9d2efffb-76e9-444c-bb88-3282ab08e9dd',
        slug: { current: 'public-sector-accounting' },
        title: 'Public sector accounting',
      },
      {
        _id: '0c7a2cda-c37b-47ad-bffe-81f6798713e5',
        slug: { current: 'public-service-delivery' },
        title: 'Public service delivery',
      },
      {
        _id: '9464a0b7-7a7f-4f5e-8e21-418c960f596d',
        slug: { current: 'renewable-resources' },
        title: 'Renewable resources',
      },
      {
        _id: 'c28a990c-c368-40f3-9f5b-10506eca1ef4',
        slug: { current: 'social-norms-and-networks' },
        title: 'Social norms and networks',
      },
      {
        _id: '79ddced8-82fc-4a74-87cd-9dac35d7121c',
        slug: { current: 'tax-and-revenue-collection' },
        title: 'Tax and revenue collection',
      },
      {
        _id: 'cf717144-4e91-437c-89b8-de61ac70d01b',
        slug: { current: 'ukraine' },
        title: 'Ukraine',
      },
    ],
  },
  { label: 'Publications', id: 'publications', slug: '/publications?' },
  { label: 'The U4 Blog', id: 'blog', slug: '/blog' },
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
          { label: 'Measurement tools repository', slug: '/measurement-tools ' },
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
          {
            _id: '099adb70-4dcc-4171-b794-a54f1ebb12e5',
            label: 'About us & our history',
            slug: { current: 'our-organisation-history' },
          },
          {
            _id: 'e5f2ba5d-a3eb-472c-8a51-99d98b1950f7',
            label: 'Vision & strategy',
            slug: { current: 'vision-strategy' },
          },
          {
            _id: 'c67927ca-2941-43af-ba5d-6a149d35739d',
            label: 'Operational guides & policies',
            slug: { current: 'operational-guides-policies' },
          },
          {
            _id: '2e4b4b96-6719-4eae-b696-38469741e2fa',
            label: 'Vacancies & opportunities',
            slug: { current: 'vacancies-opportunities' },
          }, // { label: 'About us', slug: '/about-u4' },
          { _id: 'frontpage', label: 'People', slug: '/the-team' },
        ],
      },
      {
        subtitle: 'Who we work with',
        slug: '/who-we-work-with',
        type: 'work-with',
        items: [
          {
            _id: 'a0317176-8581-45cf-89c8-451963611dd4',
            label: 'Funding partners',
            slug: { current: 'u4-partner-agencies' },
          },
          {
            _id: '3fa0112a-4861-4ee3-aaa2-e9e921c0a476',
            label: 'Become a partner',
            slug: { current: 'become-a-partner' },
          }, // {_id: 'u4-partner-agencies', label: 'Funding Partners', slug: '/u4-partner-agencies' },
          // { label: 'Partner Information', slug: '/u4-partner-agencies' },
          // {_id: 'the-team', label: 'Expert Network', slug: '/the-team' },
          { _id: 'frontpage', label: 'Anti-corruption helpdesk', slug: '/helpdesk' },
        ],
      },
      { subtitle: 'General enquiries', items: [{ label: 'Contact', slug: '/contact' }] },
    ],
  },
  { label: 'Search', id: 'search' },
];
