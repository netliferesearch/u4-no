export default ({ queryString = '', limit: { from = 0, to = 20 } = { from: 0, to: 20 } }) => {
  const matchString = queryString.length
    ? queryString
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .split(' ')
      .map(tkn => `"${tkn}*"`)
      .join(',')
    : queryString;
  console.log(matchString);
  return `*[
      (title match [${matchString}]
        || references(*[[firstName, surname] match [${matchString}]]._id, false)
        || longTitle match [${matchString}]
        || explainerText match [${matchString}]
        || firstName match [${matchString}]
        || surname match [${matchString}]
        || email match [${matchString}]
        || subtitle match [${matchString}]
        || standfirst match [${matchString}]
        || lead match [${matchString}]
        || summaryExternal match [${matchString}]
        || acknowledgements match [${matchString}]
        || abstract match [${matchString}]
        || description match [${matchString}]
        || term match [${matchString}]
        || definition match [${matchString}]
        || keyword match [${matchString}]
        || text match [${matchString}]
        || origin match [${matchString}]
        || url match [${matchString}]
        || resolvedUrl match [${matchString}]
        || crawledAt match [${matchString}]
        || name match [${matchString}]
        || language match [${matchString}]
        || utc match [${matchString}]
        || local match [${matchString}]
        || content[].children[].text match [${matchString}]
        || sections[].children[].text match [${matchString}]
        || textLeft[].children[].text match [${matchString}]
        || textRight[].children[].text match [${matchString}]
        || caption[].children[].text match [${matchString}]
        || bio[].children[].text match [${matchString}]
        || summary[].children[].text match [${matchString}]
        || abbreviations[].children[].text match [${matchString}]
        || boxOnBoxRef[].children[].text match [${matchString}]
        || introduction[].children[].text match [${matchString}]
        || agenda[].children[].text match [${matchString}]
        || timezone match [${matchString}]
      ) && defined(slug.current)
       &&  !(_type in [ "service", "courseType"])
    ]
    [${from}...${to}]
    {_id,
      _updatedAt,
      title,
      slug,
      date,
      _type,
      subtitle,
      "publicationType": publicationType->{...},
      "authors": authors[]->{firstName, surname},
      "editors": editors[]->{firstName, surname},
      topics[]->{_id, title, slug},
      "affiliations": affiliations[]->_id,
      language,
      year,
      firstName,
      surname,
      term,
      "articleType": articleType[0]->title
    }`.replace('\n', '');
};

/**
 * Search query for related authors
 *  || references(*[[firstName, lastName] match [${matchString}]]._id, false)
 * */
