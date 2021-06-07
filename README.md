# Monorepo for u4.no

React server-side rendering with [next.js](https://nextjs.org/) and
headless backend with [Sanity](https://sanity.io).

Environments:

- Production: https://www.u4.no (auto-deploys from `production` branch)
- Staging: https://u4-frontend-staging.herokuapp.com (auto-deploys from `main` branch)

## Develop frontend

**Prerequisites to developing locally:**

- Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).
- Access for external collaborators: Ask Heroku admin to grant you collaborator access to the staging environment as well as the Heroku pipeline so that you can create Review Apps (see Branch workflow below).

**Starting application locally:**

1. Run `npm install`
1. Run `heroku config -s --app u4-frontend-staging | tr -d "'" > .env` To get .env configuration.
1. Run `npm run dev`

**Running tests:**

Run `npx jest --watch` to start running [Jest tests](https://jestjs.io) locally.

**Branch workflow:**

1. The development branch is `main` branch. Pushes to this branch will get auto-deployed to the staging environment.
1. Code changes are developed as [feature branches](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow) and then merged into `main` branch via Pull Requests. If need be you can create a [Heroku Review App](https://devcenter.heroku.com/articles/github-integration-review-apps) based on the pull request.

   - After creating a pull request you can go to the [Heroku pipeline overview](https://dashboard.heroku.com/pipelines/ba174b5e-35af-40b9-848b-570ac810fca8), and specify that you want to create a review app. You'll then get a dedicated review app accessible behind a random url which is useful when you want to give people a chance to review new features before merging them into `main` branch to be auto-deployed to the staging environment.
   - Avoid long-lived branches because they can be painful to merge in.

1. To deploy to production you create a PR from `main` into `production` branch.

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

The pdf service is a worker defined in the `Procfile`. When it starts up it listens for publication changes in Sanity. When documents are published it will contact the attached [DocRaptor service](https://elements.heroku.com/addons/docraptor) and make it go to www.u4.no/publication-slug + **/print** to build a pdf. Once the worker has downloaded the built pdf it attaches it to the Sanity publication document. When you then go to www.u4.no/publication-slug + **/pdf** a handler in `frontend/server.js` will give the pdf document attached to the Sanity document.

Relevant files when working with this pdf functionality:

- `frontend/pages/publications/[slug]/print.js`
- `frontend/style/print.scss`
- `frontend/components/printSerializers.js`
- `service-publication-pdf-builder/publication-pdf-handler.js`
- `service-publication-pdf-builder/publication-pdf-preview-handler.js`
- [DocRaptor documentation](http://docraptor.com/documentation/style)
- To see DocRaptor logs, log into Heroku and click on the DocRaptor addon attached to the Heroku dyno.

**Testing locally:**

To make DocRaptor build pdfs while you're working locally you can use Ngrok to create a web accessible tunnel (or some similar tunneling service). Once you have [Ngrok](https://ngrok.com/) running you can manually trigger pdf builds with:

```sh
cd service-publication-pdf-builder/
cp env-example .env # be sure to configure its credentials
# Deletes test.pdf if it is present, then makes DocRaptor goto provided url and build a pdf.
rm test.pdf || true && node cmd-pdf.js https://a7df9417.ngrok.io/publications/addressing-corruption-risks-in-multi-partner-funds
```

**Trigger a test build of a PDF:**

You can also do test builds of PDFs with an url like so:

```
https://u4-frontend-staging.herokuapp.com/generate-pdf-preview
  ?id=2276f04c-ee78-4dbf-8cd4-589289908149
  &url=https://u4-frontend-staging.herokuapp.com/printpreview
```

Here we define query parameters `id` which is the publication id, and then the `url` to say _which server_ DocRaptor should go to render the document. This means that when testing you can tell DocRaptor to render different documents from different servers which is useful for comparisons. For full details see `publication-pdf-preview-handler.js`.

## Develop elastic indexer service

See our 1password for access to Elastic search admin, Kibana and the index itself.

Prerequisite: We use [Textract package](https://www.npmjs.com/package/textract) to extract text from pdf, and it requires [pdftotext](http://www.xpdfreader.com/download.html) to be installed.

```sh
cd service-elastic-indexer/
cp env-example .env # be sure to configure its credentials
node index-all-documents.js

# For tests you can run.
npx jest
```

`index-all-documents.js` is built to be run periodically.

1. It grabs all Sanity documents in one request.
1. Then compares the Elastic index documents with the Sanity documents to find differences and then updates Elasticsearch based on that.
1. When processing publications with legacy pdfs it will download them as it needs to. Set `CACHE_PDF=true` to have this part reuse already downloaded pdfs for speed when developing locally. You can also tweak `.env` variable `ES_BATCH_SIZE=` for faster ES document insertion.

Other relevant files:

- `remove-indexes.js` useful for quickly resetting index setup. If you change index mapping you need to rebuild the index before you can add the new mapping.
- `lib/mappings.js` how the ES mappings are configured.
- `lib/indexer.lib.js` how the Sanity types are processed before being sent to ES.

### Things worth knowing regarding search

- [The Kibana dashboard is great for debugging](https://af344fe248e84d9d83970ac229bf57da.eu-central-1.aws.cloud.es.io:9243/login) the various Elasticsearch indexes.
- Adjusting the search weights is done in: `/frontend/helpers/elastic-data-loader.js`.
