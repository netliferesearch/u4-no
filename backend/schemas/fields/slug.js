export default {
  name: 'slug',
  type: 'slug',
  options: {
    source: 'title',
    slugify: input => input
                         .toLowerCase()
                         .replace(/\s+/g, '-')
                         .slice(0, 200)
  }
}
