import { client } from './sanityClient.pico';

function extractRefs(obj) {
  let result = [];
  if (Array.isArray(obj)) {
    obj.forEach(sub => {
      result = result.concat(extractRefs(sub));
    });
  } else if (obj && obj._ref) {
    return [obj._ref];
  } else if (typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      result = result.concat(extractRefs(obj[key]));
    });
  }
  return result;
}

function fetchAll(ids) {
  if ( ids.length == 0) {
    // console.log( 'Nothing to materialize here');
    return Promise.resolve({});
  }
  const query = `*[${ids.map(id => `_id=="${id}"`).join('||')}]`;
  return client.fetch(query).then(docs => {
    const result = {};
    docs.forEach(doc => {
      result[doc._id] = doc;
    });
    return result;
  });
}

function merge(obj, children) {
  if (Array.isArray(obj)) {
    return obj.map(sub => merge(sub, children));
  } else if (children[obj._ref]) {
    return obj._key ? Object.assign({}, obj, { target: children[obj._ref] }) : children[obj._ref];
  } else if (typeof obj === 'object') {
    const result = {};
    Object.keys(obj).forEach(key => {
      result[key] = merge(obj[key], children);
    });
    return result;
  }
  return obj;
}

const Materialize = (doc, depth) => {
  const iterations = depth || 1;
  let result = Promise.resolve(doc);
  const iteration = src => fetchAll(extractRefs(src)).then(docs => merge(src, docs));
  for (let i = 0; i < iterations; i++) {
    result = result.then(iteration);
  }
  return result;
};

export default Materialize;
