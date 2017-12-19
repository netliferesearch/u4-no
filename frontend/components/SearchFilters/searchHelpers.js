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
  // start by assuming that the document should not be shown.
  let showItem = false;
  filterList.forEach((filterName) => {
    if (filterName === 'pub-type-0' && document._type === 'publication') {
      // show all publications"
      showItem = true;
    } else if (/^pub-type-(.*)/.test(filterName)) {
      const publicationTypeId = /^pub-type-(.*)/.exec(filterName)[1];
      const { publicationType = {} } = document;
      // Only if there is a positive filter match do we flip the showItem flag
      // to positive. This is because we do not want any other negative filter
      // matches to exclude a document that has at least one positive match.
      if (publicationTypeId === publicationType._id) {
        showItem = true;
      }
    } else if (/^pub-topic-(.*)/.test(filterName)) {
      const topicTitle = /^pub-topic-(.*)/.exec(filterName)[1];
      const { topics = [] } = document;
      // for each topic attached to the document we evaluate we try to
      // slugify the title and compare it to the topic title derived from
      // the filtername
      if (some(topics, ({ title = '' }) => slugify(title, { lower: true }) === topicTitle)) {
        showItem = true;
      }
    } else if (/^pub-year-(.*)/.test(filterName)) {
      const year = /^pub-year-(.*)/.exec(filterName)[1];
      if (getPubYear(document) === Number.parseInt(year, 10)) {
        showItem = true;
      }
    }
  });
  return showItem;
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
    // we consider the results returned by sanity as already organized by relevance
    // so we return them as is. If relevance need to be improved we must first
    // try to improve the sanity query and then perhaps add logic here.
    const weightedResults = prioritize(searchString, results);
    return weightedResults;
  } else if (/^year-.*/.test(sortCriteria)) {
    const docsWithoutDate = results.filter(res => !res.date);
    const docsWithDate = results.filter(res => res.date);
    // sort the docs that have date and attach the rest at the end
    const sortedDocs = sortBy(docsWithDate, ({ date }) => moment(date.local).valueOf());
    if (sortCriteria === 'year-asc') {
      return sortedDocs.concat(docsWithoutDate);
    } else if (sortCriteria === 'year-desc') {
      return sortedDocs.reverse().concat(docsWithoutDate);
    }
  }
  // sortCriteria did not match anything just return results as is.
  return results;
}
