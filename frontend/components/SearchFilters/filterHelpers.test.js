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

test('should handle multiple filters', async () => {
  const resultsToFilter = [
    {
      name: 'firstthing',
      publicationType: {
        _id: 'u4-issue',
      },
    },
    {
      name: 'secondthing',
      publicationType: {
        _id: 'u4-test',
      },
    },
    {
      name: 'thirdthing',
      publicationType: {
        _id: 'u4-brief',
      },
    },
  ];
  expect(
    filterResultsBySearchFilterList(resultsToFilter, ['pub-type-u4-brief', 'pub-type-u4-issue']),
  ).toEqual([
    {
      name: 'firstthing',
      publicationType: {
        _id: 'u4-issue',
      },
    },
    {
      name: 'thirdthing',
      publicationType: {
        _id: 'u4-brief',
      },
    },
  ]);
});
