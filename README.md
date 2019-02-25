# Monorepo for u4.no

React server-side rendering with [next.js](https://github.com/zeit/next.js/) and
headless backend with [Sanity](https://sanity.io).

Enviroments:

- Staging: https://u4-frontend-staging.herokuapp.com
- Production: https://www.u4.no

## Develop frontend

1. Run `npm install`
1. Run `heroku config -s --app u4-frontend-staging | tr -d "'" > .env` To get .env configuration.
1. Run `npm run dev`

**Tests:** Run `npx jest --watch` to start running [Jest tests](https://jestjs.io) locally.

For local development of frontend. Push changes to master branch to test them on the staging environment. Pushes and Pull Requests to the production branch deploys the app on production.

## Develop Sanity backend

For local development of backend:

```sh
cd backend
sanity install # install dependencies the first time
sanity start
```

Deploy changes for Sanity with `sanity deploy`. Remember to commit and push
changes to git as well.

## Develop pdf builder service

The pdf service is a worker defined in the `Procfile`. When it starts up it listens for publication changes in Sanity. When documents are published it will contact the attached [DocRaptor service](https://elements.heroku.com/addons/docraptor) and make it go to www.u4.no/publication-slug**/print** to build a pdf. Once the worker has downloaded the built pdf it attaches it to the Sanity publication document. When you then go to www.u4.no/publication-slug**/pdf** a handler in `frontend/server.js` will give the pdf document attached to the Sanity document.

Relevant files when working with this pdf functionality:

- `frontend/pages/publication.print.js`
- `frontend/style/print.scss`
- `frontend/components/printSerializers.js`
- [DocRaptor documentation](http://docraptor.com/documentation/style)

To make DocRaptor build pdfs while you're working locally you can use Ngrok to create a web accessible tunnel.

Once you have [Ngrok](https://ngrok.com/) running you can manually trigger pdf builds with:

```sh
cd service-publication-pdf-builder/
cp env-example .env # be sure to configure its credentials
# Deletes test.pdf if it is present, then makes DocRaptor goto provided url and build a pdf.
rm test.pdf || true && node cmd-pdf.js https://a7df9417.ngrok.io/publications/addressing-corruption-risks-in-multi-partner-funds
```

## Develop elastic indexer service

See our 1password for access to Elastic search admin, Kibana and the index itself.

```sh
# PDF extraction needs 'pdftotext' to be available on the command line.
brew cask install pdftotext

cd service-elastic-indexer/
cp env-example .env # be sure to configure its credentials
node index-all-documents.js
```

`index-all-documents.js` is built to be run periodically.

1. It grabs all Sanity documents in one request.
1. Then compares the Elastic index documents with the Sanity documents to find differences and then updates Elasticsearch based on that.
1. When processing publications with legacy pdfs it will download them to `/tmp/sanity` as it needs to. Set `CACHE_PDF=true` to have this part reuse already downloaded pdfs for speed when developing locally. You can also tweak `.env` variable `ES_BATCH_SIZE=` for faster ES document insertion.

Other relevant files:

- `remove-indexes.js` useful for quickly resetting index setup. If you change index mapping you need to rebuild the index before you can add the new mapping.
- `lib/mappings.js` how the ES mappings are configured.
- `lib/indexer.lib.js` how the Sanity types are processed before being sent to ES.
