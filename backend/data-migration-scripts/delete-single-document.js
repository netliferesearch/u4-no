require('dotenv').config();
const sanityClient = require('@sanity/client');
const client = sanityClient({
  projectId: '1f1lcoov',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: true
});


(async () => {
  const result = await client.delete('2d43b4d5-d93d-474e-a549-40460328bcdf');
  /* eslint-disable */
  console.log(result)
})()
