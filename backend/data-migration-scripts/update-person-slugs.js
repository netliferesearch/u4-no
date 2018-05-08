require('dotenv').config();
const sanityClient = require('@sanity/client');
const slugify = require('slugify')
const client = sanityClient({
  projectId: '1f1lcoov',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: true
});


(async () => {
  const persons = await client.fetch('*[_type == "person"]');

  for (person of persons) {
    const newSlug = slugify(`${person.firstName}-${person.surname}`).toLowerCase()
    //await client.update({ slug: current})
    await client
      .patch(person._id)
      .set({
       slug: {
        current: newSlug
        }
      })
      .commit()
      .then(msg => console.log(msg))
      .catch(err => console.log(err))
  }
})
