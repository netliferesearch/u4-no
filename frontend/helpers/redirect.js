/* send 301 Permanent redirect to path */
export function redirectPermanent(ctx, path) {
  if (ctx.res) {
    ctx.res.writeHead(301, { Location: path });
    ctx.res.end();
  } else {
    document.location.pathname = path;
  }
}

/* return matching redirect path if any, else false */
export function getRedirect(ctx) {
  const redirects = [
    { from: '/articles/the-basics-of-anti-corruption', to: '/topics' },
    { from: '/articles-fr-FR', to: '/' },
    { from: '/articles', to: '/' },

    { from: '/document', to: '/' },

    { from: '/formation', to: '/online-courses' },

    { from: '/glossaire', to: '/terms' },
    {
      from: '/glossary/petty-corruption-see-bureacratic-corruption/',
      to: '/terms#petty-corruption',
    },
    { from: '/glossary/', to: '/terms#' },

    { from: '/helpdesk-fr-FR', to: '/helpdesk' },
    { from: '/helpdesk-help', to: '/helpdesk' },

    { from: '/home/SphinxSearchForm?', to: '/search?' },
    { from: '/home', to: '/' },

    { from: '/info/about-u4/course-experts/', to: '/the-team' },
    { from: '/info/about-u4/vacancies-calls-for-proposals/', to: '/about-u4' },
    { from: '/info/about-u4', to: '/about-u4' },
    { from: '/info/contact-us/partner-agencies', to: '/u4-partner-agencies' },
    { from: '/info/contact-us/staff', to: '/the-team' },
    { from: '/info/contact-us', to: '/the-team' },
    { from: '/info-fr', to: '/about-u4' },
    { from: '/info', to: '/about-u4' },

    { from: '/partner/classroom/assignment.cfm?n=1', to: '/online-courses' },
    { from: '/partner/classroom/forum.cfm', to: '/online-courses' },
    { from: '/partner/classroom/participants-list.cfm', to: '/online-courses' },
    { from: '/partner/classroom', to: '/online-courses?oldpage=' },

    { from: '/publications', to: '/search?filters=pub-type-0&search=%2A' },
    {
      from: '/publications-2-fr-FR',
      to: '/search?filters=pub-type-0%2Cpub-lang-fr_FR&search=%2A',
    },
    {
      from: '/publications-2-es-ES',
      to: '/search?filters=pub-type-0%2Cpub-lang-es_ES&search=%2A',
    },
    { from: /\/publications\/([^/]+)\/downloadasset\/([^/]*)/i, to: '/pdf/$1' },

    {
      from:
        '/recommended-reading/underground-banking-legitimate-remittance-network-or-money-laundering-system/',
      to: '/topics/international-drivers-of-corruption',
    },

    { from: '/themes/aacc', to: '/topics' },
    { from: '/themes/anti-corruption-agencies', to: '/topics' },
    { from: '/themes/anti-corruption-approaches-in-sector-work', to: '/topics' },
    { from: '/themes/corruption-and-aid', to: '/topics/development-cooperation' },
    { from: '/themes/corruption-in-emergencies', to: '/topics' },
    { from: '/themes/education-sector', to: '/topics/basic-services' },
    { from: '/themes/ethics', to: '/topics' },
    { from: '/themes/evaluation-and-measurement', to: '/topics/evaluation-and-measurement' },
    { from: '/themes/fragile-states', to: '/topics' },
    { from: '/themes/health-sector', to: '/topics/basic-services' },
    {
      from: '/themes/international-drivers-of-corruption',
      to: '/topics/international-drivers-of-corruption',
    },
    { from: '/themes/justice-sector', to: '/topics/justice-sector' },
    { from: '/themes/justice', to: '/topics/justice-sector' },
    { from: '/themes/money-in-politics', to: '/topics' },
    { from: '/themes/monitoring-aid', to: '/topics/development-cooperation' },
    { from: '/themes/natural-resource-management', to: '/topics/natural-resources-and-energy' },
    { from: '/themes/natural-resources', to: '/topics/natural-resources-and-energy' },
    { from: '/themes/nrm', to: '/topics/natural-resources-and-energy' },
    { from: '/themes/people-s-engagement', to: '/topics/people-s-engagement-1' },
    { from: '/themes/pfm', to: '/topics/public-financial-management' },
    { from: '/themes/private-sector', to: '/topics/private-sector' },
    { from: '/themes/procurement', to: '/topics/public-financial-management' },
    {
      from: '/themes/public-financial-management-and-procurement',
      to: '/topics/public-financial-management',
    },
    { from: '/themes/redd-integrity', to: '/topics' },
    { from: '/themes/un-convention-against-corruption', to: '/topics' },
    { from: '/themes-es-ES', to: '/topics' },
    { from: '/themes', to: '/topics' },
    {
      from: '/training/online-training/corruption-in-natural-resource-management',
      to: '/courses/addressing-corruption-in-natural-resources-and-renewable-energy-sectors',
    },
    {
      from: '/training/online-training/essentials-of-anti-corruption/',
      to: '/courses/essentials-of-anti-corruption-i-the-basics',
    },
    { from: '/training', to: '/online-courses' },

    { from: '/u4-centre-de-ressources-anti-corruption/', to: '/' },

    { from: '/your-partner-profile', to: '/' },
  ];
  const redir = redirects.find(({ from }) => ctx.asPath.match(from));

  if (redir) {
    return ctx.asPath.replace(redir.from, redir.to).replace(/^(.+?)\/*?$/, '$1');
  }
  return false;
}
