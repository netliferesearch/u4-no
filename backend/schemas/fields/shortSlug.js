import ShortSlugInput from '../../components/ShortSlug';

async function isUniqueAcrossAllDocuments(slug, context) {
  const {document, getClient} = context
  const client = getClient({apiVersion: '2022-12-07'})
  const id = document._id.replace(/^drafts\./, '')
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  }
  const query = `!defined(*[!(_id in [$draft, $published]) && shortSlug.current == $slug][0]._id)`
  const result = await client.fetch(query, params)
  return result
}

const shortSlug = {
  title: 'Short URL',
  name: 'shortSlug',
  type: 'slug',
  options: {
    source: '_id', 
    isUnique: isUniqueAcrossAllDocuments,
    urlPrefix: 'u4.no/r/',
    placeholder: 'Enter a custom value or generate random'
  },
  components: {
    input: ShortSlugInput
  }
};

export default shortSlug;
