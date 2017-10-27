import { filterResultsBySearchFilterList } from './filterHelpers';

test('can filter result list for publication types', async () => {
  const whatToFilterFor = {
    name: 'otherthing',
    publicationType: {
      _id: 'u4-issue',
    },
  };
  const resultsToFilter = [
    { name: 'thing' },
    {
      name: 'thirdthing',
      publicationType: {
        _id: 'u4-brief',
      },
    },
    whatToFilterFor,
  ];
  expect(filterResultsBySearchFilterList(resultsToFilter, ['pub-type-u4-issue'])).toEqual([
    whatToFilterFor,
  ]);
});

test('should show all results if no filter', async () => {
  const resultsToFilter = [
    { name: 'thing' },
    {
      name: 'thirdthing',
      publicationType: {
        _id: 'u4-brief',
      },
    },
  ];
  expect(filterResultsBySearchFilterList(resultsToFilter, [])).toEqual(resultsToFilter);
});
