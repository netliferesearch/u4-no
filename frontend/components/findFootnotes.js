const FindFootnotes = (blocks = []) => {
  /**
   * First find markDefs that is footnotes.
   * @todo: this doesn't work recursively, in case
   * a footnote happens to have a footnotes (footnotes, should
   * probably not have footnotes though)
   */
  const footnoteChecker = _type => _type === 'footnote' || _type === 'blockNote';
  const markDefinitions = blocks
    .filter(({ markDefs = [] }) => markDefs.filter(({ _type }) => footnoteChecker(_type)).length)
    .map(({ markDefs }) => markDefs.filter(({ _type = '' }) => footnoteChecker(_type)))
    .reduce((acc, elem) => ([...elem, ...acc]), []);

  /**
   * Reduce the array to an object where the reference is key,
   * and the content is a block content array
   */
  const footnotes = markDefinitions
    .filter(({ _key, content }) => _key && content)
    .reduce((acc, { _key, content }) => ({ [_key]: content, ...acc }), {});
  return footnotes;
};

export default FindFootnotes