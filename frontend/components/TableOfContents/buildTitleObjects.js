import slugify from 'slugify';

const buildTitleObject = (elem = {}) => {
  if (!elem.children) return;
  const title = elem.children[0].text;
  return {
    style: elem.style,
    title,
    id: elem.id || slugify(title, { lower: true, remove: /[$*_+~.()'"!\-:@]/g }),
  };
};

/**
 * Loops through all titles in a sanity content block and creates a list of
 * objects like so:
 *
 * [{
 *  title: 'Large header',
 *  style: 'h2',
 *  id: 'large-header',
 *  children: [{
 *    title: 'Sub Heading',
 *    style: 'h3',
 *    id: 'sub-heading'
 *  }]
 * }]
 */
const buildTitleObjects = (content = []) =>
  content.reduce((titles, elem) => {
    const previousTitle = titles[titles.length - 1];
    if (elem.style === 'h2') {
      titles.push(buildTitleObject(elem));
    } else if (elem.style === 'h3' && !previousTitle) {
      // if the article begins with an h3 but there are no previous titles
      // we then promote it to an h2
      titles.push(buildTitleObject(elem));
    } else if (elem.style === 'h3' && previousTitle.children) {
      previousTitle.children.push(buildTitleObject(elem));
    } else if (elem.style === 'h3' && previousTitle) {
      previousTitle.children = [buildTitleObject(elem)];
    }
    return titles;
  }, []);

export default buildTitleObjects;
