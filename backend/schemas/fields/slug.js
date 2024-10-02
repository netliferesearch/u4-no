export default {
  name: 'slug',
  type: 'slug',
  validation: Rule => Rule.required(),
  options: {
    source: 'title',
    slugify: input => input
                         .toLowerCase()
                         .replace('ø', 'o').replace('æ', 'ae').replace('œ', 'oe')
                         .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                         .replace(/[^a-z0-9\s-]/g, ' ')
                         
                         .trim()
                         .replace(/[\s-]+/g, '-')
                         .slice(0, 200)
  }
}
