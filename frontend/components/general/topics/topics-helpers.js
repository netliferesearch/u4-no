import { sortBy } from 'lodash';

export const sortTopics = (items, key) => {
  return sortBy(items, [key]);
};

export const sortByDate = items => {
  return sortBy(items, function(dateObj) {
    return dateObj._updatedAt;
  }).reverse();
};

export const topicsPageContent = {
  title: 'Research topics',
  intro:
    'What is corruption? The basics of corruption and anti-corruption efforts for sustainable and inclusive development',
  sort: {
    title: 'Order:',
    types: [{ value: 'topics', label: 'Alphabetically' }, { value: 'date', label: 'Last update' }],
  },
};
