import { slug } from './fields';

export default {
  name: 'person',
  type: 'object',
  fields: [
    {
      name: 'firstName',
      type: 'string'
    },
    {
      name: 'surname',
      type: 'string'
    },
    {
      name: 'email',
      type: 'email'
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'surname',
        slugify: input => input
                             .toLowerCase()
                             .replace(/\s+/g, '-')
                             .slice(0, 200)
      }
    },
    {
      name: 'affiliations',
      title: 'Affiliations',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'institution',
            },
          ],
        },
      ],
    },
    {
      name: 'bio',
      title: 'Short biography',
      type: 'array',
      of: [
        {
          type: 'block'
        },
      ],
    },
    {
      name: 'image',
      type: 'image',
    }
  ],
  preview: {
    select: {
      firstName: 'firstName',
      surname: 'surname',
      email: 'email',
      image: 'image.asset.url'
    },
    prepare({ firstName = 'N.', surname = 'N', image, email = '' }) {
      return {
        title: `${firstName} ${surname}`,
        subtitle: email,
        image
      }
    }
  }
 }
