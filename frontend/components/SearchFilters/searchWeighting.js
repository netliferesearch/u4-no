// Reorders hits according to our custom rules [if 'Rem' then x10]

import _ from 'lodash';

export default function prioritize(searchString, hits) {
  const terms = (searchString || '').match(/\w+/g) || [];
  const regexpTerms = terms.map((term) => {
    return `\\b${term}`
  }).join('|');
  const matcher = new RegExp(`(${regexpTerms})`, 'gi');

  function uniqueMatches(text) {
    const matches = (text.match(matcher) || [])
      .map((match) => {
        return match.toLowerCase();
      });
    return _.uniq(matches).length;
  }

  hits.forEach((hit, i) => {
    let story = hit.title + ' ';
    // const baseScore = 1.0 + count - (1 / count) * count;
    let score = 1;
    const title = hit.title || hit.name || hit.longTitle;
    if (title) {
      const titleMatchCount = uniqueMatches(title);
      story += "tmc:" + titleMatchCount + ' ';
      if (titleMatchCount >= terms.length) {
        score *= 10;
        story += "full-title-match ";
      } else if (titleMatchCount > 0) {
        score *= 3;
        story += "partial-title-match ";
      }
    }
    let text = '';
    Object.keys(hit).forEach((key) => {
      if (typeof hit[key] === 'string') {
        text += ' ' + hit[key];
      }
    })
    const matchCount = uniqueMatches(text);
    story += "txtmc:" + matchCount + ' ';
    if (matchCount >= terms.length) {
      story += "full-match-in-text "
      score *= 2;
    }
    if (hit._type === 'topics') {
      story += 'is-topic ';
      score *= 1.1;
    }
    // if (hit.type === 'profile' && uniqueMatches(hit.name) > 0) {
    //   story += 'is-profile ';
    //   score *= 30;
    // }
    hit.___score = score;
  });

  return hits.sort((a, b) => {
    return b.___score - a.___score;
  });
}