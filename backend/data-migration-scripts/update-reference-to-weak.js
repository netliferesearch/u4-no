require('dotenv').config();
const sanityClient = require('@sanity/client');
const client = sanityClient({
  projectId: '1f1lcoov',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: true
});


(async () => {
  const publications = await client.fetch('*[_type == "publication"][0..10000]');
  /* eslint-disable */
  for (publication of publications) {
    if (publication.hasOwnProperty('topics')) {
      const topics = publication.topics
        .filter(topic => topic)
        .filter(({_ref = false}) => _ref)
        .reduce((acc, curr) => [{...curr, _weak: true}, ...acc], [])
      console.log(topics)
      await client
        .patch(publication._id)
        .set({topics})
        .commit()
        .then(msg => console.log(msg))
        .catch(err => console.log(err))
    }
  }
})()
