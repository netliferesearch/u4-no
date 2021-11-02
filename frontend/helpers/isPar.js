const isPar = p => (p.children && p.style === 'normal' ? true : false);

const getFirstPart = content => {
  const firstPart = [];
  const countPar = [];
  content.forEach(b => {
    if (countPar.length < 2) {
      firstPart.push(b);
      if (isPar(b) === true) {
        countPar.push(b);
      }
    } else {
      return firstPart;
    }
  });
  return firstPart;
};