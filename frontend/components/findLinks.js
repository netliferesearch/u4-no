export default (blocks = []) => {
  /**
   * First find markDefs that is links.
   */
  const linkChecker = _type => _type === 'link' || _type === 'reference';
  const markDefinitions = blocks
    .filter(({ markDefs = [] }) => markDefs.filter(({ _type }) => linkChecker(_type)).length)
    .map(({ markDefs }) => markDefs
      .filter(({ _type = '' }) => linkChecker(_type))
      .filter(({ href = '' }) => !href.match(/#_ftn(|ref)(\d+)/))
    )
    .reduce((acc, elem) => ([...elem, ...acc]), []);
  /**
   * Reduce the array to an object where the reference is key,
   * and the content is a block content array
   */
  const links = markDefinitions
    .filter(({ _key, href }) => _key && href)
    .reduce((acc, { _key, href }) => ({ [_key]: href, ...acc }), {});
  return links;
};
