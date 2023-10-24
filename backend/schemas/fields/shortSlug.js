
import ShortSlugInput from '../../components/ShortSlug';

const getRandomString = () => {
  const length = 3;
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const slugify = (_id, _type) => {
  const randomString = getRandomString();
  // if unique return value else call recursively until unique
  return isGloballyUnique(randomString, _id) ? randomString : slugify(_id, _type);
};

const isGloballyUnique = (slug, _id) => {
  const id = _id.replace(/^drafts\./, '');
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  };
  const query = `!defined(*[!(_id in [$draft, $published]) && shortSlug.current == $slug][0]._id)`;
  return getClient.fetch(query, params);
};

const isUnique = (slug, options) => {
  const { document } = options;
  return isGloballyUnique(slug, document._id);
};

const shortSlug = {
  title: 'Short URL',
  name: 'shortSlug',
  type: 'slug',
  options: {
    source: '_id', // slugify uses this to verify uniqueness
    slugify: slugify,
    isUnique,
    urlPrefix: 'u4.no/r/',
    placeholder: 'Enter a custom value or generate random'
  },
  inputComponent: ShortSlugInput,
};

export default shortSlug;
