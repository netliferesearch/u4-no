import client from './config';

function extractRefs(obj) {
  let result = [];
  if (Array.isArray(obj)) {
    obj.forEach((sub) => {
      result = result.concat(extractRefs(sub));
    });
  } else if (obj._ref) {
    return [obj._ref];
  } else if (typeof obj === 'object') {
    Object.keys(obj).forEach((key) => {
      result = result.concat(extractRefs(obj[key]));
    });
  }
  return result;
}

function fetchAll(ids) {
  const query = `*[${ids.map(id => `_id=="${id}"`).join('||')}]`;
  return client.fetch(query).then((docs) => {
    const result = {};
    docs.forEach((doc) => {
      result[doc._id] = doc;
    });
    return result;
  });
}

function merge(obj, children) {
  if (Array.isArray(obj)) {
    return obj.map(sub => merge(sub, children));
  } else if (children[obj._ref]) {
    return children[obj._ref];
  } else if (typeof obj === 'object') {
    const result = {};
    Object.keys(obj).forEach((key) => {
      result[key] = merge(obj[key], children);
    });
    return result;
  }
  return obj;
}

export default (doc, depth) => {
  const iterations = depth || 1;
  console.log('iterations', iterations);
  let result = Promise.resolve(doc);
  const iteration = src =>
    fetchAll(extractRefs(src)).then(docs => merge(src, docs));
  for (let i = 0; i < iterations; i++) {
    result = result.then(iteration);
  }
  return result;
};
