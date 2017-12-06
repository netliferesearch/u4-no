export default (blocks = []) => {
  /**
   * First find markDefs that is footnotes.
   * @todo: this doesn't work recursively, in case
   * a footnote happens to have a footnotes (footnotes, should
   * probably not have footnotes though)
   */
  const markDefinitions = blocks
    .filter(({ markDefs = [] }) => markDefs.filter(m => m._type === 'footnote').length)
    .map(({ markDefs }) => markDefs.filter(({ _type = '' }) => _type === 'footnote')[0]);

  /**
   * Reduce the array to an object where the reference is key,
   * and the content is a block content array
   */
  const footnotes = markDefinitions.reduce(
    (acc, elem) => ({ [elem._key]: elem.content, ...acc }),
    {},
  );
  return footnotes;
};
