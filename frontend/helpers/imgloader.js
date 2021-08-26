export const imgLoader = ({ src, width, quality }) => {
  return `${src}?auto=format&w=${width}&q=${quality || 75}`;
};

export const getPlaceholder = index => {
  const placeholders = [1, 2, 3];
  const result = index + 1 % placeholders.length;
  return '../../../public/placeholder-0' + result + '.png';
};
