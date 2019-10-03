export default function resolveProductionUrl(document) {
  return `https://u4-frontend-staging.herokuapp.com/preview/${document._type}/${document._id}`
}
