export default ({ publicationType = {}, publicationNumber = false, reference = false }) => {
  if (reference) return reference;
  else if (publicationType.title && publicationNumber) {
    return `U4 Anti-Corruption Resource Centre, Chr. Michelsen Institute (${
      publicationType.title
    } ${publicationNumber})`;
  } else if (publicationNumber) return publicationNumber;
  return '';
};
