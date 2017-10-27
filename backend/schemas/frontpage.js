import FunkyEditor from '../components/FunkyEditor'
import license from './fields/license';
/**
 * A publication is a long form document
 */
import { Input as UrlWithMetadataInput } from 'part:url-metadata-input/input';
import {
  title,
  subtitle,
  date,
  image,
  leadText,
} from './fields'

export default {
  name: 'frontpage',
  type: 'object',
  title: 'Frontpage',
  fields: [
    title,
    subtitle,
    leadText,
    {
      name: 'featuredImage',
      title: 'Featured image',
      description: 'This is the image that illustrates this publication in the hero, frontpage and previews',
      type: 'image',
      options: {
        isHighlighted: true,
        hotspot: true,
      },
      fields: [
        {
          name: 'altText',
          title: 'Alternative text',
          description: 'For users that can\'t see images',
          type: 'string'
        },
        {
          name: 'caption',
          title: 'Caption text',
          description: '',
          type: 'string'
        },
        {
          name: 'licensor',
          title: 'Lisence',
          type: 'text'
        },
        license,
      ]
    },
    {
      name: 'sections',
      type: 'array',
      of: [
        {
          type: 'block'
        }
      ],
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        slugify: input => input
                             .toLowerCase()
                             .replace(/\s+/g, '-')
                             .slice(0, 200)
      }
    },
    {
      name: 'relatedUrl',
      title: 'Related URL',
      type: 'urlWithMetadata',
      inputComponent: UrlWithMetadataInput
    }
  ]
}
