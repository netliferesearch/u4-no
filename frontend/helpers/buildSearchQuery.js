export default ({ queryString = false, limit: { from = 0, to = 20 } = { from: 0, to: 20 } }) => {
  const matchString = queryString.length
    ? queryString
      .split(' ')
      .map(tkn => `"${tkn}*"`)
      .join(',')
    : queryString;
  return `{
    "results":
    *[
      (title match [${matchString}]
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
    ]
    [${from}...${to}]
    {_id,
      title,
      slug,
      date,
      _type,
      subtitle,
      "publicationType": publicationType->{...},
      "authors": authors[]->{...},
      "editors": editors[]->{...},
      topics[]->{_id, title, slug},
      language,
      year,
      firstName,
      surname
    }}`.replace('\n', '');
};

/**
 * Search query for related authors
 *  || references(*[[firstName, lastName] match [${matchString}]]._id, false)
 * */
