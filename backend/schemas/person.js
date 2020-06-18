import { slug, license } from './fields';
import augmentSchema from './fields/augmentSchema';

export default augmentSchema({
  name: 'person',
  title: 'Person',
  type: 'document',

  fields: [
    {
      name: 'firstName',
      type: 'string',
      localize: true,
    },
    {
      name: 'surname',
      type: 'string',
      localize: true,
    },
    {
      name: 'position',
      type: 'string',
      localize: true,
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'string',
    },
    {
      name: 'twitter',
      type: 'url',
    },
    {
      name: 'medium',
      type: 'url',
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: doc => `${doc.firstName}-${doc.surname}`,
        slugify: input =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .slice(0, 200),
      },
      validation: Rule => Rule.custom( slug => {return typeof slug === 'undefined' ? 'Slug cannot be empty' : true})
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
      type: 'url',
    },
    {
      name: 'bio',
      title: 'Full biography',
      type: 'defaultBlocks',
      localize: true,
    },
    {
      name: 'bioShort',
      title: 'Short biography',
      type: 'defaultBlocks',
      description: 'For publications on pdfs etc. Typically just one paragraph.',
      localize: true,
    },
    {
      name: 'image',
      type: 'image',
      options: {
        isHighlighted: true,
        hotspot: true,
      },
      fields: [
        {
          name: 'altText',
          title: 'Alternative text',
          description: "For users that can't see images",
          type: 'string',
        },
        {
          name: 'caption',
          title: 'Caption text',
          description:
            'Shows next to image. Title from Flickr – if applicable. Describe context and/or message. Name people and places.',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [],
              marks: {
                // Only allow these decorators
                decorators: [{ title: 'Emphasis', value: 'em' }],
              },
            },
          ],
        },
        {
          name: 'size',
          title: 'Image size',
          description: 'Set size for image in frontend that supports it',
          type: 'string',
          options: {
            list: [
              { title: 'wide', value: 'wide' },
              { title: 'normal', value: 'normal' },
              { title: 'small', value: 'small' },
              { title: 'narrow', value: 'narrow' },
            ],
          },
        },
        {
          name: 'credit',
          title: 'Credit',
          description: 'Photographer/publisher’s name.',
          type: 'text',
        },
        {
          name: 'sourceUrl',
          title: 'Credit URL',
          type: 'url',
          description: 'Enter link for source for the image or the originator',
        },
        license,
      ],
    },
  ],
  orderings: [
    {
      title: 'First name',
      name: 'firstNameAsc',
      by: [{ field: 'firstName', direction: 'asc' }],
    },
    {
      title: 'Last name',
      name: 'surnameAsc',
      by: [{ field: 'surname', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      firstName: 'firstName',
      surname: 'surname',
      email: 'email',
      imageUrl: 'image.asset.url',
      description: 'position',
    },
    prepare(
      { firstName = 'N.', surname = 'N', imageUrl, email = '', description = '' },
      viewOptions = {}
    ) {
      const previewtitle =
        viewOptions.ordering && viewOptions.ordering.name === 'firstNameAsc'
          ? `${firstName} ${surname}`
          : `${surname}, ${firstName}`;
      return {
        title: previewtitle,
        subtitle: email,
        imageUrl: imageUrl,
        description: description,
      };
    },
  },
});
