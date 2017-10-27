import uniqBy from 'lodash/uniqBy';

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
  let showItem = true;
  filterList.forEach((filterName) => {
    // apply publication filters
    const re = /^pub-type-(.*)/;
    if (re.test(filterName)) {
      showItem = false;
      const publicationTypeId = re.exec(filterName)[1];
      const { publicationType = {} } = document;
      showItem = publicationTypeId === publicationType._id;
    }
    return null;
  });
  return showItem;
}

export function filterResultsBySearchFilterList(results = [], filterList = []) {
  return results.filter(res => applyFilters(res, filterList));
}
