import publicationContent from './fields/publicationContent'
import annotations from './fields/annotations'
import HighChartsEditor from '../components/HighChartsEditor'
/**
 * A publication is a long form document
 */
import { Input as UrlWithMetadataInput } from 'part:url-metadata-input/input';
import {
  title,
  subtitle,
  standfirst,
  image,
  leadText,
  slug,
  language,
  license
} from './fields'

export default {
    name: 'publication',
    title: 'Publication',
    type: 'document',
    fields: [
      title,
      {
        name: 'chart',
        title: 'Chart',
        type: 'object',
        inputComponent: HighChartsEditor,
        options: {
          editModal: 'fullscreen'
        },
        fields: [
          {
            name: 'htmlStr',
            readOnly: true,
            type: 'string'
          }
        ]
      },
      subtitle,
      standfirst,
      slug,
      leadText,
      {
        name: 'pdfFile',
        title: 'Pdf file (generated)',
        type: 'file'
      },
      {
        name: 'legacypdf',
        title: 'Pdf file (uploaded)',
        description: 'This file overrides the generated pdf',
        type: 'file'
      },
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
            description: 'Shows next to image. Title from Flickr – if applicable. Describe context and/or message. Name people and places.',
            type: 'array',
            of: [
              {
                type: 'block',
                styles: [],
                marks: {
                  // Only allow these decorators
                  decorators: [
                    { title: 'Emphasis', value: 'em' }
                  ],
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
            type: 'text'
          },
          {
            name: 'sourceUrl',
            title: 'Credit URL',
            type: 'url',
            description: 'Enter link for source for the image or the originator'
          },
          license,
        ]
      },
      {
        name: 'summary',
        title: 'Short version',
        description: 'One-pager, blog-like, light narrative. Bite-sized chunks with descriptive sub-headings. Explain: 1. the main recommendations and/or implications and findings, and  2. why this is important. Max 1000 words.',
        type: 'array',
        of: [
          {
            type: 'block',
            styles: [
              {title: 'Normal', value: 'normal'},
              {title: 'H2', value: 'h2'},
              {title: 'H3', value: 'h3'},
              {title: 'H4', value: 'h4'},
              {title: 'H5', value: 'h5'},
            ],
            // Only allow numbered lists
            marks: {
              // Only allow these decorators
              decorators: [
                {title: 'Strong', value: 'strong'},
                {title: 'Emphasis', value: 'em'}
              ],
              // Support annotating text with a reference to an author
              annotations,
            }
          }
        ]
      },
      {
        name: 'summaryExternal',
        title: 'Link to external short version',
        description: 'Most probably a medium link',  type: 'url'
      },
      {
        name: 'date',
        description: 'Date of publication',
        type: 'richDate',
        options: {
          inputUtc: true,
          dateFormat: 'YYYY-MM-DD',
          inputDate: true,
          inputTime: false,
        }
      },
      publicationContent,
      {
        name: 'methodology',
        title: 'Methodology',
        description: '(Optional and only for long texts): A clear statement of the research question and methodology explained.',
        type: 'array',
        of: [
          {
            type: 'block',
            styles: [
              {title: 'Normal', value: 'normal'},
              {title: 'H2', value: 'h2'},
              {title: 'H3', value: 'h3'},
              {title: 'H4', value: 'h4'},
              {title: 'H5', value: 'h5'},
            ],
            // Only allow numbered lists
            marks: {
              // Only allow these decorators
              decorators: [
                {title: 'Strong', value: 'strong'},
                {title: 'Emphasis', value: 'em'}
              ],
              // Support annotating text with a reference to an author
              annotations,
            }
          }
        ]
      },
      {
        name: 'references',
        title: 'Publication references',
        description: 'A list of the sources used in this publication',
        type: 'array',
        of: [
          {
            type: 'block',
            lists: [],
            styles: [],
            marks: {
              // Only allow these decorators
              decorators: [
                {title: 'Strong', value: 'strong'},
                { title: 'Emphasis', value: 'em' }
              ],
              annotations,
            },
          },
        ],
      },
      {
        name: 'mainPoints',
        title: 'Main points',
        description: 'List 2–10 implications/recommendations/must-knows for development professionals. 1-2 sentences per point.',
        type: 'array',
        of: [
          {
            type: 'string',
          }
        ]
      },
      {
        name: 'relatedContent',
        title: 'Recommended and related content',
        description: 'Add related content, max 3 will be displayed in the frontend',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [
              {
                type: 'publication',
              },
              {
                type: 'article',
              },
            ],
          },
        ],
      },
      {
        name: 'authors',
        description: 'Place in order of appearance',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [
              {
                type: 'person'
              }
            ]
          }
        ]
      },
      {
        name: 'notes',
        description: 'Optional notes for PDFs and similiar',
        type: 'array',
        of: [
          {
            type: 'block',
            lists: [],
            styles: [],
            marks: {
              // Only allow these decorators
              decorators: [
                {title: 'Strong', value: 'strong'},
                { title: 'Emphasis', value: 'em' }
              ],
            },
          },
        ],
      },
      {
        name: 'editors',
        title: 'Series editors',
        description: 'Responsible U4 staff member',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [
              {
                type: 'person'
              }
            ]
          }
        ]
      },
      {
        name: 'partners',
        title: 'Partnership',
        type: 'array',
        of: [
          {
            name: 'partner',
            type: 'object',
            fields: [
              {
                type: 'text',
                name: 'description',
                description: 'E.g. “This is a joint partnership”',
              },
              {
                type: 'reference',
                name: 'institution',
                title: 'institution',
                to: [
                  {
                    type: 'institution',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'acknowledgements',
        type: 'text'
      },
      {
        name: 'abstract',
        type: 'text'
      },
      {
        name: 'keywords',
        description: 'Chose from drop-down menu of the available U4 keywords.',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [
              {
                type: 'keyword'
              }
            ]
          }
        ],
      },
      {
        name: 'publicationType',
        title: 'Publication type',
        type: 'reference',
        to: [
          {
            type: 'publicationType'
          }
        ]
      },
      {
        name: 'publicationNumber',
        title: 'Publication Number',
        description: 'e.g. "2016:1" ',
        type: 'string'
      },
      {
        name: 'reference',
        title: 'Bibliographic reference override',
        description: 'Leave this empty to generate from fields above, like "U4 Anti-Corruption Resource Centre, Chr. Michelsen Institute (U4 Brief 2017:1)""',
        type: 'string'
      },
      {
        name: 'abbreviations',
        title: 'Abbreviations',
        type: 'array',
        of: [
          {
            type: 'block',
            styles: [
              {title: 'Normal', value: 'normal'},
              {title: 'H2', value: 'h2'},
              {title: 'H3', value: 'h3'},
              {title: 'H4', value: 'h4'},
              {title: 'H5', value: 'h5'},
            ],
            // Only allow numbered lists
            marks: {
              // Only allow these decorators
              decorators: [
                {title: 'Strong', value: 'strong'},
                {title: 'Emphasis', value: 'em'}
              ],
              // Support annotating text with a reference to an author
              annotations,
            },
          },
        ],
        preview: {
          select: {
            title: 'title',
            subtitle: 'text'
          },
          prepare({ title = '', subtitle = false }) {
            return {
              title,
              subtitle: subtitle ? subtitle[0].children[0].text : 'Empty'
            };
          },
        }
      },
      {
        name: 'blurbs',
        type: 'array',
        of: [
          {
            type: 'blurb'
          }
        ]
      },
      {
        name: 'topics',
        description: 'Select relevant U4 topics',
        type: 'array',
        of: [
          {
            type: 'reference',
            weak: true,
            to: [
              {
                type: 'topics'
              }
            ]
          }
        ],
        preview: {
          title: 'topics.title'
        }
      },
      language,
      {
        name: 'translation',
        title: 'Translation of',
        description: 'If this publication is the translation of another U4 publication',
        type: 'reference',
        to: [
          {
            type: 'publication'
          }
        ]
      },
      {
        name: 'updatedVersion',
        title: 'Updated version',
        description: 'If there is a more recent version of this publication',
        type: 'reference',
        to: [
          {
            type: 'publication'
          }
        ]
      },
      {
        name: 'headsUp',
        title: 'Heads up',
        description: 'Important message to the reader, like "The content in this publication might be outdated"',
        type: 'array',
        of: [
          {
            type: 'block',
            lists: [],
            styles: [],
            marks: {
              // Only allow these decorators
              decorators: [
                {title: 'Strong', value: 'strong'},
                { title: 'Emphasis', value: 'em' }
              ],
            },
          },
        ],
      },
      {
        name: 'workflow',
        type: 'object',
        title: 'Editorial workflow',
        description: 'Keep track',
        fields: [
          {
            name: 'assigned',
            type: 'array',
            of: [
              {
                type: 'reference',
                to: [
                  {
                    type: 'person'
                  }
                ]
              }
            ]
          },
          {
            name: 'progress',
            type: 'string',
            options: {
                list: [
                  { title: 'ready', value: 'ready' },
                  { title: 'authoring', value: 'authoring' },
                  { title: 'editing', value: 'editing' },
                  { title: 'proof reading', value: 'proof reading' },
                  { title: 'ready for publishing', value: 'ready for publishing' },
                  { title: 'published', value: 'published' },
                ],
                layout: 'radio',
              },
          },
        ],
      },
      {
        name: 'relatedUrl',
        title: 'Related URL',
        type: 'urlWithMetadata',
        inputComponent: UrlWithMetadataInput
      }
    ],
    orderings: [
      {
        title: 'Title',
        name: 'titleAsc',
        by: [{ field: 'title', direction: 'asc' }],
      },
      {
        title: 'Date',
        name: 'dateDesc',
        by: [{ field: 'date.utc', direction: 'desc' }],
      },
      {
        title: 'Publication type',
        name: 'typeAsc',
        by: [{ field: 'publicationType.title', direction: 'asc' }],
      },
    ],
    preview: {
      select: {
        title: 'title',
        authors: 'authors',
        publicationType: 'publicationType.title',
        publicationNumber: 'publicationNumber',
        reference: 'reference',
        date: 'date',
        imageUrl: 'featuredImage.asset.url',
        description: 'standfirst',
      },
      prepare({ title = '(title missing)', authors = {}, publicationNumber = '', publicationType = '', reference = '', date = '', imageUrl, description = '' }) {
        // const authornames = authors.map(author => (author.target ? author.target : author)).map(({ firstName = 'N', surname = 'N' }) => (`${firstName} ${surname}`));
        const author = authors.length == 0 ? '(authors missing)' : '';
        const pubYear = (date != '' ) ? date.utc.split('-')[0] : '';
        const subtitle =
          publicationNumber != ''
            ? `${publicationType} ${publicationNumber} ${author}`
            : `${publicationType} ${pubYear} ${reference} ${author}`;
        return {
          title: title,
          subtitle: subtitle,
          imageUrl: imageUrl,
          description: description,
        };
      },
    },
  }
