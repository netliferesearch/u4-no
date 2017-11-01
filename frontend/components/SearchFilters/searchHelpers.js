import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import moment from 'moment';

export function findPublications(results = []) {
  return results.filter(({ _type }) => _type === 'publication');
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

function applyFilters(document = {}, filterList = []) {
  let showItem = false;
  filterList.forEach((filterName) => {
    // apply publication filters
    const re = /^pub-type-(.*)/;
    if (re.test(filterName)) {
      const publicationTypeId = re.exec(filterName)[1];
      const { publicationType = {} } = document;
      if (publicationTypeId === publicationType._id) {
        showItem = true;
      }
    }
  });
  return showItem;
}

export function filterResultsBySearchFilterList(results = [], filterList = []) {
  if (filterList.length > 0) {
    return results.filter(res => applyFilters(res, filterList));
  }
  return results;
}

export function sortResultsBySortCriteria({ results = [], sortCriteria = '' }) {
  if (sortCriteria === 'relevance') {
    // we consider the results returned by sanity as already organized by relevance
    // so we return them as is. If relevance need to be improved we must first
    // try to improve the sanity query and then perhaps add logic here.
    return results;
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
