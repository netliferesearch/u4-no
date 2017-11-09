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
      name: 'position',
      type: 'string'
    },
    {
      name: 'email',
      type: 'email'
    },
    {
      name: 'phone',
      type: 'string'
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
      name: 'cv',
      title: 'CV',
      type: 'file'
    },
    {
      name: 'bio',
      title: 'Short biography',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
          ],
          // Only allow numbered lists
          marks: {
            // Only allow these decorators
            decorators: [
              {title: 'Emphasis', value: 'em'}
            ],
            // Support annotating text with a reference to an author
            annotations: [
              {name: 'link', title: 'External Link', type: 'object', fields: [{ name: 'href', title: 'URL', type: 'url'}] },
              {name: 'internalReferance', title: 'Author or publication', type: 'reference', to: [{type: 'person'},{type: 'publication'},{type: 'article'}]},
            ]
          }
        },
      ],
    },
    {
      name: 'image',
      type: 'image',
    }
  ],
  orderings: [
    {
      title: 'Last name',
      name: 'surnameAsc',
      by: [{ field: 'surname', direction: 'asc' }],
    },
    {
      title: 'First name',
      name: 'firstNameAsc',
      by: [{ field: 'firstName', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      firstName: 'firstName',
      surname: 'surname',
      email: 'email',
      image: 'image.asset.url',
    },
    prepare({ firstName = 'N.', surname = 'N', image, email = ''}, viewOptions = {}) {
      const previewtitle =
        viewOptions.ordering && viewOptions.ordering.name === 'firstNameAsc'
          ? `${firstName} ${surname}`
          : `${surname}, ${firstName}`;
      return {
        title: previewtitle,
        subtitle: email,
        image,
      };
    },
  },
 }
