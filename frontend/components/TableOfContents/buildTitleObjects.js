import slugify from 'slugify';

const buildTitleObject = (elem) => {
  const title = elem.children[0].text;
  return {
    style: elem.style,
    title,
    id: slugify(title, { lower: true }),
  };
};

const buildTitleObjects = (content = []) =>
  content.reduce((result, elem) => {
    const lastResultItem = result[result.length - 1];
    if (elem.style === 'h2') {
      result.push(buildTitleObject(elem));
    } else if (elem.style === 'h3' && lastResultItem.children) {
      lastResultItem.children.push(buildTitleObject(elem));
    } else if (elem.style === 'h3') {
      lastResultItem.children = [buildTitleObject(elem)];
    }
    return result;
  }, []);

export default buildTitleObjects;
