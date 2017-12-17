import data from './printSerializers.data.json';
import findFootnotes from './findFootnotes';

const result = {
  '980694afbe3d': [
    {
      _type: 'block',
      style: 'normal',
      _key: '6ffac836a50a',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: '6ffac836a50a0',
          text:
            'Two fresh reports by the OECD and FATF have, e.g. found West African smuggling of narcotics, contraband and humans to be a source of funding for terrorist groups and criminal syndicates (Reitano & Diesing 2016, FATF-GIABA-GABAC 2016).',
          marks: [],
        },
      ],
    },
  ],
  '911b4dbaf10f': [
    {
      _key: '7c01d6f39b82',
      _type: 'block',
      children: [
        {
          _key: '7c01d6f39b820',
          _type: 'span',
          marks: [],
          text:
            'In each of the four countries, at least one of the resources is of particular significance, and the issue paper will therefore mainly focus on one commodity per country. While the paper has a country-specific focus, the supply chains of these resources are transnational and usually involve multiple sites of extraction and trade across borders. Since illicit activities also tend to span across borders, the issue paper also draws on evidence from across the region.',
        },
      ],
      markDefs: [],
      style: 'normal',
    },
  ],
};

test('Make legacy footnote object from legacy block content', () => {
  const footnotes = findFootnotes(data[0].content);
  expect(findFootnotes()).toEqual({});
  expect(footnotes['911b4dbaf10f']).toEqual(result['911b4dbaf10f']);
  expect(footnotes['980694afbe3d']).toEqual(result['980694afbe3d']);
});

test('Make footnote object from block content', () => {
  const footnotes = findFootnotes(data[1].content);
  console.log(footnotes);

  /* expect(footnotes['911b4dbaf10f']).toEqual(result['911b4dbaf10f']);
  expect(footnotes['980694afbe3d']).toEqual(result['980694afbe3d']); */
});
