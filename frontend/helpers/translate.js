/*
  translation functions and strings for publication print
*/

// currently translated languages
const languageCodes = ['fr', 'es', 'in', 'uk'];

// 2 letter code from language code
export const langCode = (language = 'en') => {
  return language?.length >= 2 ? language.substr(0, 2) : 'en';
};

// for sanity queries: list of localised field names
// ex: localize(title) = title, title_fr, title_es, ..
export const localize = fieldName => {
  return languageCodes.reduce(
    (fieldnames, lang) => `${fieldnames},${fieldName}_${lang}`,
    fieldName
  );
};

// language version of field if any, else default
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

// function translating term to language
export const translate = (language = 'en') => {
  return key => {
    const defaultlang = 'en';
    const lang = langCode(language);
    if (!(strings[lang] && strings[lang][key])) {
      console.warn(`Translation of '${key}' for '${lang}' not found.`);
      return strings[defaultlang][key] || '';
    }
    return strings[lang][key];
  };
};

// translated versions of same set of terms for all languages
const strings = {
  en: {
    disclaimer: 'Disclaimer',
    disclaimer_text:
      'All views in this text are the author(s)’, and may differ from the U4 partner agencies’ policies.',
    partner_agencies: 'Partner agencies',
    u4_partner_agencies: 'U4 partner agencies',
    about_u4: 'About U4',
    cover_photo: 'Cover photo',
    publisher_and_bibliographic_reference: 'Publisher and bibliographic reference',
    keywords: 'Keywords',
    publication_type: 'Publication type',
    u4_issue: 'U4 Issue',
    notes: 'Notes',
    creative_commons: 'Creative commons',
    creative_commons_text:
      'This work is licenced under a Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International licence',
    creative_commons_licenses: 'CC BY-NC-ND 4.0',
    by: 'By',
    by_plural: 'By',
    reviewed_by: 'Reviewed by',
    series_editor: 'Series editor',
    series_editors: 'Series editors',
    main_points: 'Main points',
    table_of_contents: 'Contents',
    abstract: 'Abstract',
    about_the_author: 'About the author',
    about_the_authors: 'About the authors',
    acknowledgements: 'Acknowledgements',
    references: 'References',
    and: 'and',
    methodology: 'Methodology',
    abbreviations: 'Abbreviations',
    collaborators: 'Collaborators',
  },

  fr: {
    disclaimer: 'Clause de non-responsabilité',
    disclaimer_text:
      'Les opinions exprimées dans ce texte n’engagent que les auteurs et peuvent différer des politiques des organismes partenaires d’U4.',
    partner_agencies: 'Organismes partenaires',
    u4_partner_agencies: 'Organismes partenaires U4',
    about_u4: 'A propos d’U4',
    cover_photo: 'Photo de couverture',
    publisher_and_bibliographic_reference: 'Publisher and bibliographic reference',
    keywords: 'Mots-clés',
    publication_type: 'Type de publication',
    notes: 'Notes',
    creative_commons: 'Licence Creative commons',
    creative_commons_text:
      'Ce travail est distribué sous licence Creative Commons Attribution – Pas d’utilisation commerciale – Pas de modification 4.0 Licence internationale',
    creative_commons_licenses: 'CC BY-NC-ND 4.0',
    by: 'Par',
    by_plural: 'Par',
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
    u4_partner_agencies: 'Instituciones asociadas',
    about_u4: 'Sobre U4',
    cover_photo: 'Foto de portada',
    publisher_and_bibliographic_reference: 'Publisher and bibliographic reference',
    keywords: 'Palabras clave',
    publication_type: 'Tipo de publicación',
    notes: 'Notas',
    creative_commons: 'Licencia',
    creative_commons_text:
      'Este trabajo tiene una licencia Internacional de Creative Commons Attribution-NonCommercial-NoDerivatives 4.0',
    creative_commons_licenses: 'CC BY-NC-ND 4.0',
    by: 'Por',
    by_plural: 'Por',
    reviewed_by: 'Revisado por',
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

  in: {
    disclaimer: 'Pernyataan Penyangkalan',
    disclaimer_text:
      'Semua pandangan dalam teks ini adalah milik penulis dan bisa berbeda dengan lembaga mitra U4.',
    partner_agencies: 'Lembaga Mitra',
    u4_partner_agencies: 'Lembaga mitra U4',
    about_u4: 'Tentang U4',
    cover_photo: 'Foto sampul',
    publisher_and_bibliographic_reference: 'Publisher and bibliographic reference',
    keywords: 'Kata Kunci',
    publication_type: 'Jenis Publikasi',
    notes: 'Catatan',
    creative_commons: 'Creative commons',
    creative_commons_text:
      'Karya ini dilisensikan dengan Atribusi Creative Commons-NonCommercial-Lisensi Internasional NoDerivatives 4.0',
    creative_commons_licenses: 'CC BY-NC-ND 4.0',
    by: 'Oleh',
    by_plural: 'Oleh',
    reviewed_by: 'Ditinjau oleh',
    series_editor: 'Editor seri',
    series_editors: 'Editor seri',
    main_points: 'Poin utama',
    table_of_contents: 'Daftar isi',
    abstract: 'Abstract',
    about_the_author: 'Tentang penulis',
    about_the_authors: 'Tentang penulis',
    acknowledgements: 'Ucapan terima kasih',
    references: 'Referensi',
    and: 'dan',
    methodology: 'Metodologi',
    abbreviations: 'Singkatan',
  },
  uk: {
    disclaimer: 'Застереження',
    disclaimer_text:
      'Усі погляди авторів, висловлені в цьому тексті, не обов’язково відображають погляди партнерів U4.',
    partner_agencies: 'Партнери',
    u4_partner_agencies: 'Партнери',
    about_u4: 'Про U4',
    cover_photo: 'Фото на обкладинці',
    publisher_and_bibliographic_reference: 'Publisher and bibliographic reference',
    keywords: 'Ключові слова',
    publication_type: 'Тип публікації',
    u4_issue: 'Зведення U4',
    notes: 'Notes',
    creative_commons: 'Організація Creative commons',
    creative_commons_text:
      'Ця праця ліцензована згідно з Міжнародною ліцензією Creative Commons «Із зазначенням авторства – некомерційна – без похідних» 4.0',
    creative_commons_licenses: 'CC BY-NC-ND 4.0',
    by: 'Автор:',
    by_plural: 'Автори:',
    reviewed_by: 'Reviewed by',
    series_editor: 'Редактор серії',
    series_editors: 'Series editors',
    main_points: 'Основні моменти',
    table_of_contents: 'Зміст',
    abstract: 'Abstract',
    about_the_author: 'Про автора',
    about_the_authors: 'Про авторів',
    acknowledgements: 'Подяки',
    references: 'Список джерел',
    and: 'і',
    methodology: 'Methodology',
    abbreviations: 'Abbreviations',
  },
};
