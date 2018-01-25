import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import some from 'lodash/some';
import moment from 'moment';
import slugify from 'slugify';
import prioritize from './searchWeighting';

export function findPublications(results = []) {
  return results.filter(({ _type }) => _type === 'publication');
}

export function getPubYear({ date = {} }) {
  return moment(date.utc).year();
}

export function isAuthorInPublication({ author, publication }) {
  const { authors } = publication;
  return some(authors, ({ _id }) => _id === author._id);
}

/**
 * Find unique publication types in the list of current search results
 * @param  {Array} results list of sanity documents
 * @return {Array}         publicationTypes
 */
export function findPublicationTypes(results = []) {
  const publications = findPublications(results);
  return (
    // create a publication list with unique publication titles
    uniqBy(publications, ({ publicationType = {} }) => publicationType.title)
      // create list of only publication title
      .map(({ publicationType = {} }) => ({
        title: publicationType.title,
        _id: publicationType._id,
      }))
      // remove publicationType with no title
      .filter(({ title }) => !!title)
  );
}

/**
 * Decide whether or not to include a document according to filter list criteria.
 *
 * Pro-tip: Have the tests running in watch mode before working on this function
 * since the logic can throw people off.
 *
 * @param  {Object} [document={}]    document to filter.
 * @param  {Array}  [filterList=[]]  list of filter names.
 * @return {Boolean}                 whether or not to show this document.
 */
function applyFilters(document = {}, filterList = []) {
  // start with no filter values
  const filterValue = {};
  filterList.forEach((filterName) => {
    /* if show only publications then hide others */
    if (filterName === 'pub-type-0') {
      filterValue.pubtype = document._type === 'publication';

      /* if pubtype filter and not already true */
    } else if (/^pub-type-(.*)/.test(filterName) && !filterValue.pubtype) {
      const publicationTypeId = /^pub-type-(.*)/.exec(filterName)[1];
      const { publicationType = {} } = document;
      filterValue.pubtype = publicationTypeId === publicationType._id;

      /* if topic filter and not already true */
    } else if (/^pub-topic-(.*)/.test(filterName) && !filterValue.pubtopic) {
      const topicTitle = /^pub-topic-(.*)/.exec(filterName)[1];
      const { topics = [] } = document;
      // for each topic attached to the document we evaluate we try to
      // slugify the title and compare it to the topic title derived from
      // the filtername
      filterValue.pubtopic = some(
        topics,
        ({ title = '' }) => slugify(title, { lower: true }) === topicTitle,
      );

      /* if pubyear filter and not already true */
    } else if (/^pub-year-(.*)/.test(filterName) && !filterValue.pubyear) {
      const year = /^pub-year-(.*)/.exec(filterName)[1];
      filterValue.pubyear = getPubYear(document) === Number.parseInt(year, 10);

      /* if language filter and not already true */
    } else if (/^pub-lang-(.*)/.test(filterName) && !filterValue.publang) {
      const filterLanguage = /^pub-lang-(.*)/.exec(filterName)[1];
      const { language = '' } = document;
      filterValue.publang = language === filterLanguage;

      /* if author filter and not already true */
    } else if (/^pub-author-(.*)/.test(filterName) && !filterValue.pubauthor) {
      const slugifiedAuthorName = /^pub-author-(.*)/.exec(filterName)[1];
      const { authors = [] } = document;
      filterValue.pubauthor = some(
        authors,
        ({ surname, firstName }) =>
          slugify(`${surname}-${firstName}`, { lower: true }) === slugifiedAuthorName,
      );
    }
  });
  /* if at least one filter is false return false */
  for (const f in filterValue) if (!filterValue[f]) return false;
  return true;
}

/**
 * Filter Sanity search results.
 *
 * @param  {Array}  [results=[]]    Sanity search results
 * @param  {Array}  [filterList=[]] List of filter names to apply
 * @return {Array}                  Filtered result.
 */
export function filterResultsBySearchFilterList(results = [], filterList = []) {
  // it's important that if there are no filters we skip this filtering entirely
  // because the filter logic assumes that a document should not be shown by default.
  // In other words, if we filter and have no active filters there will be no results.
  if (filterList.length > 0) {
    return results.filter(res => applyFilters(res, filterList));
  }
  return results;
}

export function sortResultsBySortCriteria({ searchString = '', results = [], sortCriteria = '' }) {
  if (sortCriteria === 'relevance') {
    // The relevance sorting is controlled by the searchWeighting.js function.
    const weightedResults = prioritize(searchString, results);
    return weightedResults;
  } else if (/^year-.*/.test(sortCriteria)) {
    // sort the docs that have date and attach the rest at the end
    const sortedDocs = sortBy(results, ({ date = {}, _updatedAt = '' }) => {
      return date.utc ? moment(date.utc).valueOf() : moment(_updatedAt).valueOf()
    });
    if (sortCriteria === 'year-asc') {
      return sortedDocs
    } else if (sortCriteria === 'year-desc') {
      return sortedDocs.reverse()
    }
  }
  // sortCriteria did not match anything just return results as is.
  return results;
}
