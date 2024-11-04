const fullTitle = ({ title, subtitle }) => {
  if (title && subtitle) {
    return '.!?'.includes(title.slice(-1)) ? `${title} ${subtitle}` : `${title}. ${subtitle}`;
  }
  return title;
};

export default fullTitle;
