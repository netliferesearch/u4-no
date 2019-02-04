export default ({
  publicationType = {},
  publicationNumber = false,
  reference = false,
  shortVersion = false,
}) => {
  if (shortVersion && publicationType.title && publicationNumber) {
    return `${publicationType.title} ${publicationNumber})`;
  } else if (shortVersion && publicationNumber) return publicationNumber;
  else if (reference) return reference;
  else if (publicationType.title && publicationNumber) {
    return `U4 Anti-Corruption Resource Centre, Chr. Michelsen Institute (${
      publicationType.title
    } ${publicationNumber})`;
  } else if (publicationNumber) return publicationNumber;
  return '';
};
