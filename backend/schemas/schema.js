import createSchema from 'part:@sanity/base/schema-creator';
import publication from './publication';
import nugget from './nugget';
import topics from './topics';
import person from './person';
import term from './term';
import publicationType from './publicationType';
import keyword from './keyword';
import blurb from './blurb';
import pullQuote from './pullQuote';


export default createSchema({
  name: 'default',
  types: [
    nugget,
    topics,
    person,
    publication,
    publicationType,
    term,
    keyword,
    blurb,
    pullQuote,
  ]
})
