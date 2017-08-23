import createSchema from 'part:@sanity/base/schema-creator';
import publication from './publication';
import nugget from './nugget';
import topics from './topics';
import person from './person';
import term from './term';
import publicationType from './publicationType';
import keyword from './keyword';
import blurb from './blurb';

const pullQuote = {
    title: 'Pull Quote',
    name: 'pullQuote',
    type: 'object',
    fields: [
      {
        name: 'text',
        type: 'text'
      }
    ],
    preview: {
      select: {
        title: 'text'
      }
    }
  }


export default createSchema({
  name: 'default',
  types: [
    pullQuote,
    nugget,
    topics,
    person,
    publication,
    publicationType,
    term,
    keyword,
    blurb
]
})
