import S from '@sanity/desk-tool/structure-builder';

import client from 'part:@sanity/base/client';

function generateArrayOfYears() {
  var max = new Date().getFullYear()
  var min = 2003
  var years = []

  for (var i = max; i >= min; i--) {
    years.push(i.toString())
  }
  return years
}
const years = generateArrayOfYears();

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
          const pubs = await client.fetch('*[_type == $type]._id', { type: 'publication' });
          const pubTypes = await client.fetch(
            '*[_type == "publicationType"]{"id":_id, "name": title, "itemcount": count(*[_type == "publication" && references(^._id)])}|order(itemcount desc)'
          );

          return S.list()
            .title('Publications w/ filters')
            .items([
              S.listItem()
                .title('By type')
                .child(
                  S.list()
                    .title('Publications by type')
                    .items(
                      pubTypes.map(({ id, name, itemcount }) => {
                        return S.listItem()
                          .title(`${name} (${itemcount})`)
                          .child(
                            S.documentList()
                              .title(`Publications: ${name}`)
                              .defaultLayout('detail')
                              .defaultOrdering([{ field: 'date.utc', direction: 'desc' }])
                              .filter(`_type == "publication" && publicationType._ref == "${id}" `)
                          );
                      })
                    )
                ),
              S.listItem()
                .title('By year')
                .child(
                  S.list()
                    .title('Publications by year')
                    .items(
                      years.map(y => {
                        return S.listItem()
                          .title(y)
                          .child(
                            S.documentList()
                              .title(`Publications ${y}`)
                              .defaultLayout('detail')
                              .filter(`_type == "publication" && date.utc match "${y}" `)
                          );
                      })
                    )
                ),
              S.divider(),
              ...pubs.map(pubId =>
                S.documentListItem()
                  .id(pubId)
                  .schemaType('publication')
              ),
            ]);
        }),
      S.divider(),
      ...S.documentTypeListItems(),
    ]);
