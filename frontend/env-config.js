require('dotenv').config({ path: './.env' });
// const prod = process.env.NODE_ENV === 'production';
const stage = process.env.STAGING === 'true';

module.exports = {
  'process.env.SANITY_TOKEN': stage ? '' : process.env.SANITY_TOKEN,
};
