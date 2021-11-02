const loader = ({ src, width, quality }) => {
  return `${src}?auto=format&w=${width}&q=${quality || 75}`;
};
export default loader;
