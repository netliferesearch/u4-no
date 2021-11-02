export function shortSentences(str) {
  let string = str;
  let short = string.split('.', 3).join('.');

  return short;
}

export function spacesToDash(string) {
  let str = string;
  let mutatingString = str.split(' ').join('-');
  let finalString = mutatingString.charAt(0).toLowerCase() + mutatingString.slice(1);

  return finalString;
}
