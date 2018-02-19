require('dotenv').config({ path: './.env' });
const prod = process.env.NODE_ENV === 'production';

module.exports = {
  'process.env.SANITY_TOKEN': prod ? '' : process.env.SANITY_TOKEN,
};
