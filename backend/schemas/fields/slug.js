export default {
  name: 'slug',
  type: 'slug',
  options: {
    source: 'title',
    slugify: input => input
                         .toLowerCase()
                         .replace(/[`''’]/g, '')
                         .replace(/\./g, '-')
                         .replace(/\s+/g, '-')
                         .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                         .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                         .replace(/^-+/, '')             // Trim - from start of text
                         .replace(/-+$/, '')             // Trim - from end of text
                         .slice(0, 200)
  }
}
