const footnoteChecker = _type => _type === 'footnote' || _type === 'blockNote';

// find markDefs that are footnotes
const findMarkDefs = (blocks = []) =>
  blocks
    .filter(({ markDefs = [] }) => markDefs?.some(({ _type }) => footnoteChecker(_type)))
    .map(({ markDefs }) => markDefs.filter(({ _type = '' }) => footnoteChecker(_type)))
    .reduce((acc, elem) => [...acc, ...elem], []);

const FindFootnotes = (blocks = []) => {
  const markDefs = findMarkDefs(blocks.filter(block => !['reference'].includes(block._type)));

  /**
   * Reduce the array to an object where the reference is key,
   * and the content is a block content array
   */
  const footnotes = markDefs.reduce((acc, { _key, content }) => {
    if (_key && content) {
      acc[_key] = content;
    }
    return acc;
  }, {});

  // recursively process nested content blocks (like text box)
  blocks.forEach(({ content }) => {
    if (content) {
      const nestedFootnotes = FindFootnotes(content);
      Object.assign(footnotes, nestedFootnotes);
    }
  });
  return footnotes;
};

export default FindFootnotes;
