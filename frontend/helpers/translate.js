/*
  translation strings for publication print
*/

export default (language = 'en') => {
  return key => {
    const defaultlang = 'en';
    const lang = language.substr(0, 2);

    if (!strings[lang][key]) {
      console.warn(`Translation '${key}' for locale '${lang}' not found.`);
    }
    return strings[lang][key] || strings[defaultlang][key] || '';
  };
};

const strings = {
  en: {
    disclaimer: 'Disclaimer',
    disclaimer_text:
      'All views in this text are the author(s)’, and may differ from the U4 partner agencies’ policies.',
    partner_agencies: 'Partner agencies',
    about_u4: 'About U4',
    cover_photo: 'Cover photo',
    publisher_and_bibliographic_reference: 'Publisher and bibliographic reference',
    keywords: 'Keywords',
    publication_type: 'Publication type',
    notes: 'Notes',
    creative_commons: 'Creative commons',
    creative_commons_text:
      'This work is licenced under a Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International licence (CC BY-NC-ND 4.0)',
    by: 'By',
    reviewed_by: 'Reviewed by',
    series_editor: 'Series editor',
    series_editors: 'Series editors',
    main_points: 'Main points',
    table_of_contents: 'Table of contents',
    abstract: 'Abstract',
    about_the_author: 'About the author',
    about_the_authors: 'About the authors',
    acknowledgements: 'Acknowledgements',
    references: 'References',
    and: 'and',
    methodology: 'Methodology',
    abbreviations: 'Abbreviations',
  },

  fr: {
    disclaimer: 'Clause de non-responsabilité',
    disclaimer_text:
      'Les opinions exprimées dans ce texte n’engagent que les auteurs et peuvent différer des politiques des organismes partenaires d’U4.',
    partner_agencies: 'Organismes partenaires',
    about_u4: 'A propos d’U4',
    cover_photo: 'Photo de couverture',
    publisher_and_bibliographic_reference: 'Publisher and bibliographic reference',
    keywords: 'Mots-clés',
    publication_type: 'Type de publication',
    notes: 'Notes',
    creative_commons: 'Licence Creative commons',
    creative_commons_text:
      'Ce travail est distribué sous licence Creative Commons Attribution – Pas d’utilisation commerciale – Pas de modification 4.0 Licence internationale (CC BY-NC-ND 4.0)',
    by: 'Par',
    reviewed_by: 'Revu par',
    series_editor: 'Directeur de la collection',
    series_editors: 'Directeurs de la collection',
    main_points: 'Élements clés',
    table_of_contents: 'Table de matières',
    abstract: 'Resumé',
    about_the_author: 'A propos de l´auteur',
    about_the_authors: 'A propos des auteurs',
    acknowledgements: 'Remerciements',
    references: 'Reférences',
    and: 'et',
    methodology: 'Méthodologie',
    abbreviations: 'Abbreviations',
  },
};
