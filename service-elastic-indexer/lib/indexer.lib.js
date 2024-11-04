/* eslint no-debugger: off */
const fs = require('fs');
const path = require('path');
const util = require('util');
const _ = require('lodash');
const axios = require('axios');
const { htmlToText } = require('html-to-text');
const os = require('os')

const unlink = util.promisify(fs.unlink);
const mkdirp = util.promisify(require('mkdirp'));
const { extractText } = require('./extract-text');

async function downloadFile({ url, destinationFilePath }) {
  try {
    // delete file to avoid appending to existing file
    fs.unlinkSync(destinationFilePath);
  } catch (err) {
    // Expected to error if file not present, swallowing error to not flood log.
  }
  const writer = fs.createWriteStream(destinationFilePath);
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

const access = util.promisify(fs.access);
async function fileExists(filePath) {
  try {
    await access(filePath, fs.constants.F_OK);
    return true; // no error is success
  } catch (err) {
    // interpret any error as file does not exist
    return false;
  }
}

/**
 * Purpose: Find corresponding pdf file and load its contents
 */
async function findLegacyPdfContent({ document = {}, allDocuments, isRetrying = false }) {
  return null;
  if (_.isEmpty(document.legacypdf)) {
    return null;
  }
  const { asset: { _ref: fileId } = {} } = document.legacypdf;
  const sanityAsset = allDocuments.find(({ _id }) => _id === fileId);
  if (!sanityAsset) {
    console.error('document had legacypdf defined, but we could not find sanity asset.', {
      id: document._id,
      legacypdf: JSON.stringify(document.legacypdf, null, 2),
    });
    return null;
  }
  const { url, originalFilename } = sanityAsset;
  const destinationFolder = `${os.tmpdir()}/sanity-pdf-downloads`;
  const destinationFilePath = `${destinationFolder}/${originalFilename}`;
  try {
    // make folder if not exists
    await mkdirp(destinationFolder);
    let isFile = false;
    if (process.env.CACHE_PDF) {
      // Only re-use local file if cache flag is present.
      // otherwise we always assume that we don't have the file and re-download
      // it.
      isFile = await fileExists(destinationFilePath);
    }
    if (!isFile) {
      //console.log('downloading file', destinationFilePath);
      await downloadFile({
        url,
        destinationFilePath,
      });
    }
    try {
      const pdfText = await extractText({ pathOrUrl: destinationFilePath, reThrowOnFail: true });
      //console.log('finished extracting text from', destinationFilePath);
      return pdfText;
    } catch (err) {
      if (isRetrying) {
        console.error('Already retried, failing hard. Tried to read', destinationFilePath);
        process.exit(1);
      }
      //console.log('Deleting file that we failed to read, and retrying once');
      await unlink(destinationFilePath);
      return findLegacyPdfContent({ document, allDocuments, isRetrying: true });
    }
  } catch (err) {
    console.error('findLegacyPdfContent failed:', err);
    return null;
  }
}

async function processPublication({ document: doc, allDocuments }) {
  const expand = initExpand(allDocuments);
  const {
    slug: { current = '' } = {},
    abstract = '',
    topics = [],
    content = [],
    authors = [],
    editors = [],
    language: languageCode,
    pdfFile:  { asset: pdfFileAsset } = {},
    legacypdf:  { asset: legacypdfAsset } = {},
    pdfThumbnail: { asset: pdfThumbnailAsset } = {},
    ...restOfDoc
  } = doc;
  //console.log('Processing publication', doc.title);
  const url = `/publications/${current}`;
  const publicationType = expand({
    reference: doc.publicationType,
  });
  const { title: publicationTypeTitle } = publicationType;
  const languageName = getLanguageName(languageCode);
  // Find topics that reference to this publication as a resource
  const topicsThatRelateToPublication = allDocuments.filter(({ _type = '', resources = [] }) =>
    _type === 'topics' && resources.find(({ _ref = '' }) => _ref === doc._id));
  // Find the topics that this publication says it relates to.
  const publicationRelatesToTopics = expand({
    references: topics,
  });
  const relatedEditors = expand({
    references: editors,
  });
  const relatedAuthors = expand({
    references: authors,
  });
  const pdfFileUrl = expand({
    reference: pdfFileAsset,
    process: ({ url }) => url,
  });
  const legacypdfFileUrl = expand({
    reference: legacypdfAsset,
    process: ({ url }) => url,
  });
  const pdfThumbnailUrl = expand({
    reference: pdfThumbnailAsset,
    process: ({ url }) => url,
  });
  const relatedPersons = relatedAuthors.concat(relatedEditors);
  const filedUnderTopics = topicsThatRelateToPublication.concat(publicationRelatesToTopics);
  const isLegacyPublication = content.length === 0;

  return {
    // by default we add all Sanity fields to elasticsearch.
    ...restOfDoc,
    // then we override some of those fields with processed data.
    url,
    slug: { current: current },
    // If it is a legacy publication without main content we index the pdf instead
    // but since that pdf lops both content, frontpage, table of contents, reference,
    // weird characters etc we index that content into a different property so
    // it can be better scored.
    content: isLegacyPublication
      ? htmlToText(abstract, { wordwrap: false })
      : blocksToText(doc.content || []),
    ...(isLegacyPublication
      ? { legacyPdfContent: await findLegacyPdfContent({ document: doc, allDocuments }) }
      : {}),
    ...(!isLegacyPublication && abstract
      ? { abstract: htmlToText.fromString(abstract, { wordwrap: false }) }
      : {}),
    abbreviations: blocksToText(doc.abbreviations || []),
    references: blocksToText(doc.references || []),
    methodology: blocksToText(doc.methodology || []),
    authors: expand({
      references: doc.authors,
      process: ({ firstName, surname }) => `${firstName} ${surname}`,
    }),
    authorIds: expand({
      references: doc.authors,
      process: ({ _id }) => _id,
    }),
    editors: expand({
      references: doc.editors,
      process: ({ firstName, surname }) => `${firstName} ${surname}`,
    }),
    editorIds: expand({
      references: doc.editors,
      process: ({ _id }) => _id,
    }),
    topicTitles: expand({
      references: topics,
      process: ({ title }) => title,
    }),
    topicIds: topics.map(({ _ref }) => _ref),
    publicationType,
    publicationTypeTitle,
    languageName,
    pdfFileUrl,
    contentType:[doc._type],
    legacypdfFileUrl,
    pdfThumbnailUrl,
    filedUnderTopicNames: filedUnderTopics.map(({ title = '' }) => title),
    filedUnderTopicIds: filedUnderTopics.map(({ _id = '' }) => _id),
    relatedPersons: relatedPersons.map(({ slug = '' }) => slug.current),
    ...keywordsCountriesRegions( doc, expand ),
  };
}

async function processBlog({ document: doc, allDocuments }) {
  const expand = initExpand(allDocuments);
  const { slug: { current = '' } = {}, authors = [], basedonpublication, ...restOfDoc } = doc;
  const url = `/blog/${current}`;
  const relatedPersons = expand({
    references: authors,
  });

  const filedUnderTopics = allDocuments.filter(({ _type = '', resources = [] }) =>
    _type === 'topics' && resources.find(({ _ref = '' }) => _ref === doc._id));
  return {
    // by default we add all Sanity fields to elasticsearch.
    ...restOfDoc,
    // then we override some of those fields with processed data.
    url,
    content: blocksToText(doc.content || []),
    authors: expand({
      references: doc.authors,
      process: ({ firstName, surname }) => `${firstName} ${surname}`,
    }),
    ...keywordsCountriesRegions( doc, expand ),
    authorIds: expand({
      references: doc.authors,
      process: ({ _id }) => _id,
    }),
    editors: expand({
      references: doc.editors,
      process: ({ firstName, surname }) => `${firstName} ${surname}`,
    }),
    editorIds: expand({
      references: doc.editors,
      process: ({ _id }) => _id,
    }),
    contentType:[doc._type],
    filedUnderTopicNames: filedUnderTopics.map(({ title = '' }) => title),
    filedUnderTopicIds: filedUnderTopics.map(({ _id = '' }) => _id),
    relatedPersons: relatedPersons.map(({ slug = '' }) => slug.current),
  };
}

async function processArticle({ document: doc, allDocuments }) {
  const expand = initExpand(allDocuments);
  const { slug: { current = '' } = {}, authors = [], articleType, ...restOfDoc } = doc;
  const url = `/${current}`;
  const articleTypes = expand({
    references: doc.articleType,
  });
  const relatedPersons = expand({
    references: authors,
  });
  const articleTypeTitles = articleTypes.map(({ title }) => title);
  const audioVideoTypes = ['video', 'podcast'];
  let contentType = [doc._type];
  if(articleTypeTitles.some(type => audioVideoTypes.includes(type.toLowerCase()))) {
    contentType = [doc._type, 'audio-video'];
  }
  const articleTypeIds = articleTypes.map(({ _id }) => _id);
  const filedUnderTopics = allDocuments.filter(({ _type = '', resources = [] }) =>
    _type === 'topics' && resources.find(({ _ref = '' }) => _ref === doc._id));
  return {
    // by default we add all Sanity fields to elasticsearch.
    ...restOfDoc,
    // then we override some of those fields with processed data.
    url,
    content: blocksToText(doc.content || []),
    authors: expand({
      references: doc.authors,
      process: ({ firstName, surname }) => `${firstName} ${surname}`,
    }),
    authorIds: expand({
      references: doc.authors,
      process: ({ _id }) => _id,
    }),
    articleTypeTitles,
    articleTypeIds,
    contentType,
    filedUnderTopicNames: filedUnderTopics.map(({ title = '' }) => title),
    filedUnderTopicIds: filedUnderTopics.map(({ _id = '' }) => _id),
    relatedPersons: relatedPersons.map(({ slug = '' }) => slug.current),
  };
}

async function processTerm({ document: doc }) {
  const {
    slug: { current = '' } = {}, term, definition = [], ...restOfDoc
  } = doc;
  return {
    // by default we add all Sanity fields to elasticsearch.
    ...restOfDoc,
    // then we override some of those fields with processed data.
    termTitle: term,
    contentType:[doc._type],
    termContent: blocksToText(definition),
    url: `/terms#${current}`,
  };
}

async function processCollection({ document: doc }) {
  const {
    slug: { current = '' } = {}, term, definition = [], resources = [], ...restOfDoc
  } = doc;
  return {
    // by default we add all Sanity fields to elasticsearch.
    ...restOfDoc,
    contentType:[doc._type],
    url: `/collections/${current}`,
  };
}

async function processPerson({ document: doc }) {
  const {
    slug: { current = '' } = {}, 
    firstName = '', 
    surname = '', 
    bio = [], 
    bioShort = [],
    bioShort_ar = [],
    bioShort_es = [],
    bioShort_fr = [],
    bioShort_in = [],
    bioShort_uk = [],
    affiliations = [],
    ...restOfDoc
  } = doc;
  // TODO: Index person image with caption information.
  return {
    // by default we add all Sanity fields to elasticsearch.
    ...restOfDoc,
    // then we override some of those fields with processed data.
    title: `${firstName} ${surname}`,
    content: blocksToText(bio),
    contentType:[doc._type],
    url: `/the-team/${current}`,
  };
}

async function processTopic({ document: doc, allDocuments }) {
  const {
    agenda = [],
    explainerText,
    introduction: basicGuide = [],
    resources = [],
    advisors = [],
    title: topicTitle,
    slug: { current = '' } = {},
    featuredImage: { asset: featuredImageAsset } = {},
    ...restOfDoc
  } = doc;

  const expand = initExpand(allDocuments);
  const featuredImageUrl = expand({
    reference: featuredImageAsset,
    process: ({ url }) => url,
  });
  const relatedPersons = expand({
    references: advisors,
  });
  const url = `/topics/${current}`;
  // add helper flags to easier determine if we should show topic links in
  // search result.
  const isAgendaPresent = agenda.length > 0;
  const isBasicGuidePresent = basicGuide.length > 0;
  return {
    ...restOfDoc,
    // then we override some of those fields with processed data.
    topicTitle,
    url,
    contentType:[doc._type],
    numberOfTopicResources: resources.length,
    featuredImageUrl,
    topicContent: explainerText,
    basicGuide: blocksToText(basicGuide),
    agenda: blocksToText(agenda),
    isAgendaPresent,
    isBasicGuidePresent,
    relatedPersons: relatedPersons.map(({ slug = '' }) => slug.current),
  };
}

async function processFrontpage({ document: doc }) {
  const {
    slug: { current = '' } = {}, lead = [], sections = [], ...restOfDoc
  } = doc;
  return {
    // by default we add all Sanity fields to elasticsearch.
    ...restOfDoc,
    frontpageTitle: doc.title,
    // then we override some of those fields with processed data.
    content: `${getLeadText(lead)} ${blocksToText(sections)}`,
    lead: '',
    url: `/${current}`,
    contentType:[doc._type],
    frontpageSections: blocksToText(sections),
  };
}

async function processEvent({ document: doc, allDocuments = [] }) {
  const {
    slug: { current = '' } = {}, keywords = [], content = [], contact = [], lead = '', ...restOfDoc
  } = doc;
  const expand = initExpand(allDocuments);
  const relatedPersons = expand({
    references: contact,
  });
  return {
    // by default we add all Sanity fields to elasticsearch.
    ...restOfDoc,
    contentType:[doc._type],
    // then we override some of those fields with processed data.
    content: `${getLeadText(lead)} ${blocksToText(content)}`,
    url: `/events/${current}`,
    ...keywordsCountriesRegions( doc, expand ),
    relatedPersons: relatedPersons.map(({ slug = '' }) => slug.current),
  };
}

async function processCourse({ document: doc, allDocuments = [] }) {
  const {
    slug: { current = '' } = {},
    language: languageCode = '',
    lead = '',
    content = [],
    contact = [],
    ...restOfDoc
  } = doc;
  const expand = initExpand(allDocuments);
  const relatedPersons = expand({
    references: contact,
  });
  const languageName = getLanguageName(languageCode);
  const courseType = expand({
    reference: doc.courseType,
  });
  const { title: courseTypeTitle } = courseType;
  return {
    // by default we add all Sanity fields to elasticsearch.
    ...restOfDoc,
    // then we override some of those fields with processed data.
    content: `${getLeadText(lead)} ${blocksToText(content)}`,
    url: `/courses/${current}`,
    languageName,
    contentType:[doc._type],
    courseTypeTitle,
    relatedPersons: relatedPersons.map(({ slug = '' }) => slug.current),
  };
}

function getLanguageName(languageCode) {
  const languageMap = {
    en_US: 'English',
    fr_FR: 'French',
    es_ES: 'Spanish',
    de_DE: 'German',
    pt_PT: 'Portuguese',
    ru_RU: 'Russian',
    uk_UA: 'Ukrainian',
  };
  return languageMap[languageCode];
}

// keywords field contain countries and regions
// return these as separate fields parsed from the keywords field
function keywordsCountriesRegions( doc = {}, expand ) {
  if (!doc.keywords) {
    return {}
  } else {
    const toKeyword = ( {keyword}) => keyword;

    const keywords = expand({ references: doc.keywords });
    const keywordTerms_en = keywords.filter(({ category, language }) => (( category=='keyword' ) && ( language == 'en_US' ))).map( toKeyword );
    const keywordTerms_other = keywords.filter(({ category, translation }) => (( category=='keyword' ) && ( translation ))).map(({ translation }) => (expand({ reference: translation, process: toKeyword })));

    const countries_en = keywords.filter(({ category,language }) => (( category=='country' ) && ( language == 'en_US' )));
    const countries_other = keywords.filter(({ category,translation }) => (( category=='country' ) && ( translation ))).map(({ translation }) => (expand({ reference: translation })));

    const countryRegions = countries_en.concat( countries_other ).map(({ regions }) => (expand({ references: regions, process: toKeyword }))).flat();
    const regions_en = keywords.filter(({ category,language }) => (( category=='region' )) && ( language == 'en_US' )).map( toKeyword );
    const regions_other = keywords.filter(({ category,translation }) => (( category=='region' ) && ( translation ))).map(({ translation }) => (expand({ reference: translation, process: toKeyword })));

    return {
      keywords: keywords.map( toKeyword ),
      keywordTerms: _.uniq( keywordTerms_en.concat( keywordTerms_other )),
      countries: _.uniq( countries_en.map( toKeyword ).concat( countries_other.map( toKeyword ))),
      regions: _.uniq( regions_en.concat( regions_other ).concat( countryRegions )),
    }
  }
}

// The lead property has proven to sometimes be blocks and sometimes plain
// text. So, we need to handle that.
function getLeadText(lead = '') {
  if (typeof lead === 'string') {
    return lead;
  } else if (Array.isArray(lead)) {
    return blocksToText(lead);
  }
  console.error('Encountered weird lead value, exiting', { lead });
  process.exit(1);
}

async function processDocument({ document, allDocuments }) {
  const processors = {
    publication: processPublication,
    term: processTerm,
    topics: processTopic,
    article: processArticle,
    'blog-post': processBlog,
    person: processPerson,
    frontpage: processFrontpage,
    event: processEvent,
    course: processCourse,
    collection: processCollection,
  };
  // Do a lookup in the list of processors and use function if precent, otherwise
  // just return an unprocessed document.
  return processors[document._type]
    ? processors[document._type]({ document, allDocuments })
    : document;
}

function loadSanityDataFile(folderPath) {
  if (!folderPath) {
    throw new Error('loadSanityDataFile: Please provide a path.');
  }
  const documents = parseNDJSON(fs.readFileSync(path.join(folderPath, 'data.ndjson'), { encoding: 'UTF-8' }));
  const assets = parseNDJSON(fs.readFileSync(path.join(folderPath, 'assets.json'), { encoding: 'UTF-8' }));
  return { documents, assets };
}

function parseNDJSON(str) {
  return str
    .split('\n')
    .filter(str => str)
    .map(JSON.parse);
}

function getIndexName({ language = 'en_US' }) {
  const version = process.env.ES_ENV || 'staging';
  return `u4-${version}-${language}`.toLowerCase().replace(/_/gi, '-');
}

/**
 * Expand Sanity references into the referenced documents.
 * Can optionally process document after being expanded
 *
 * Call initExpand with all Sanity documents, so that it can search for references
 * there. It will return a function which you can use to expand references.
 */
function initExpand(allDocuments = []) {
  // returns a function ready to do work.
  return function expand({ reference, references = [], process = doc => doc }) {
    const expandAndProcessReference = ({ _key, _ref = '' }) => {
      const foundDoc = allDocuments.find(({ _id }) => _id === _ref);
      if (foundDoc) {
        return process({ ...foundDoc, ...(_key ? { _key } : {}) });
      }
      return null;
    };
    if (reference) {
      return expandAndProcessReference(reference);
    }
    // Filter out any null references caused by removed weak references.
    return references.map(expandAndProcessReference).filter(doc => doc);
  };
}

// Convert Sanity's portable text into plain string.
function blocksToText(blocks, opts = {}) {
  const defaults = {};
  const options = Object.assign({}, defaults, opts);
  return blocks
    .map((block) => {
      // TODO: Could make this even more general by letting it recursively
      // go down a block tree in search for indexable content.
      if (block._type === 'heading') {
        const { headingValue = '' } = block;
        return headingValue;
      } else if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`;
      }
      return block.children.map(child => child.text).join('');
    })
    .join(' ');
}

module.exports = {
  processPublication,
  initExpand,
  loadSanityDataFile,
  parseNDJSON,
  processDocument,
  getIndexName,
  findLegacyPdfContent,
  blocksToText,
};
