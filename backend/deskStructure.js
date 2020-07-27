import S from '@sanity/desk-tool/structure-builder'

import client from 'part:@sanity/base/client'

const years = ['2020','2019','2018','2017','2016','2015','2014','2013','2012']
const pubTypes = [
  {id: 'pubtype-1', name: 'U4 Briefs'},
  {id: 'pubtype-2', name: 'U4 Issue'},
  {id: 'pubtype-3', name: 'Helpdesk Answers'},
  {id: 'pubtype-4', name: 'U4 Reports'},
]

export default () =>
  S.list()
    .title('Content')
    .showIcons(false)
    .items([
      S.listItem()
      .id('experimental')
      .title('Publications (experimental)')
      .child(async () => {
        // hackish way of retrieveing documents first then rendering as documentListItems
        // instead of using documentList()
        const pubs = await client.fetch('*[_type == $type]._id', {type: 'publication'})

        return S.list()
          .title('Publications w/ filters')
          .items([
            S.listItem()
              .title('By type')
              .child( S.list()
                .title('Publications by type')
                .items( pubTypes.map(({id,name}) => {return S.listItem()
                    .title( name )
                    .child( S.documentList()
                      .title(`Publications ${name}`)
                      .defaultLayout('detail')
                      .defaultOrdering([{field: 'date.utc', direction: 'desc'}])
                      .filter(`_type == "publication" && publicationType._ref == "${id}" `)
                    )
                }))
              )
            ,
            S.listItem()
              .title('By year')
              .child( S.list()
                .title('Publications by year')
                .items( years.map( y => {return S.listItem()
                    .title( y )
                    .child( S.documentList()
                      .title(`Publications ${y}`)
                      .defaultLayout('detail')
                      .filter(`_type == "publication" && date.utc match "${y}" `)
                    )
                }))
              )
            ,
            S.divider(),
            ...pubs.map(pubId =>
              S.documentListItem()
                .id(pubId)
                .schemaType('publication')
            )
          ])
      })
      ,
      S.divider(),
      ...S.documentTypeListItems()
    ]
    )
