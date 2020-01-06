/*
  translation strings for publication print
*/

export const langCode = (language = 'en') => {
  return language.length >= 2 ? language.substr(0, 2) : 'en';
};

export const translateField = (language = 'en') => {
  return (obj, key) => {
    const defaultlang = 'en';
    const lang = langCode(language);
    if (lang === defaultlang) {
      return obj[key] || '';
    }

    if (!obj[`${key}_${lang}`]) {
      console.warn(`Translation of '${key}' for '${lang}' in  obj not found.`);
    }
    return obj[`${key}_${lang}`] || obj[key] || '';
  };
};

export const translate = (language = 'en') => {
  return key => {
    const defaultlang = 'en';
    const lang = langCode(language);

    if (!strings[lang][key]) {
      console.warn(`Translation of '${key}' for '${lang}' not found.`);
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
    main_points: 'Points principaux',
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
  es: {
    disclaimer: 'Descargo de responsabilidad',
    disclaimer_text:
      'Los puntos de vista expresados en este artículo pertenecen únicamente a los autores y no reflejan necesariamente las opiniones de las instituciones asociadas al U4.',
    partner_agencies: 'Instituciones asociadas',
    about_u4: 'Sobre U4',
    cover_photo: 'Foto de portada',
    publisher_and_bibliographic_reference: 'Publisher and bibliographic reference',
    keywords: 'Palabras clave',
    publication_type: 'Tipo de publicación',
    notes: 'Notas',
    creative_commons: 'Licencia',
    creative_commons_text:
      'Este trabajo tiene una licencia Internacional de Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 (CC BY-NC-ND 4.0)',
    by: 'Par',
    reviewed_by: 'Revu par',
    series_editor: 'Editor de la serie',
    series_editors: 'Editores de la serie',
    main_points: 'Puntos principales',
    table_of_contents: 'Indice',
    abstract: 'Resumen',
    about_the_author: 'Acerca del autor',
    about_the_authors: 'Acerca de los autores',
    acknowledgements: 'Agradecimientos',
    references: 'Bibliografía',
    and: 'y',
    methodology: 'Metodología',
    abbreviations: 'Abreviaturas',
  },
};
