import createSchema from 'part:@sanity/base/schema-creator';
import richDate from 'part:@sanity/form-builder/input/rich-date/schema'
import { schema as urlWithMetadata } from 'part:url-metadata-input/input';
import publication from './publication';
import nugget from './nugget';
import topics from './topics';
import person from './person';
import term from './term';
import publicationType from './publicationType';
import keyword from './keyword';
import blurb from './blurb';
import pullQuote from './pullQuote';
import article from './article';
import institution from './institution';
import courseType from './courseType';
import course from './course';
import service from './service';
import boxOnBox from './boxOnBox';
import workshop from './workshop';
import resource from './resource';
import frontpage from './frontpage';

export default createSchema({
  name: 'default',
  types: [
    {
      name: 'table',
      type: 'object',
      fields: [
        {
          name: 'grid',
          type: 'array',
          of: [
            {
              type: 'grid'
            }
          ]
        }
      ]
    },
    {
      name: 'grid',
      type: 'object',
      fields: [
        {
          name: 'grid',
          type: 'array',
          of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'value', type: 'string' }
                  ]
                }
              ]
        },
      ],
    },
    frontpage,
    nugget,
    topics,
    person,
    publication,
    publicationType,
    term,
    keyword,
    blurb,
    pullQuote,
    urlWithMetadata,
    article,
    institution,
    courseType,
    course,
    service,
    workshop,
    richDate,
    resource,
  ]
})
