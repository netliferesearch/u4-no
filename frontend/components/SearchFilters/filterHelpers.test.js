import { filterBySearchFilterList } from './filterHelpers';

test('can filter result list for publication types', async () => {
  const whatToFilterFor = {
    name: 'otherthing',
    publicationType: {
      title: 'u4-issue',
    },
  };
  const resultsToFilter = [
    { name: 'thing' },
    {
      name: 'thirdthing',
      publicationType: {
        title: 'u4-brief',
      },
    },
    whatToFilterFor,
  ];
  expect(filterBySearchFilterList(resultsToFilter, ['pub-type-u4-issue'])).toEqual([
    whatToFilterFor,
  ]);
});
