# Monorepo for u4.no

React server-side rendering with [next.js](https://github.com/zeit/next.js/) and
headless backend with [Sanity](https://sanity.io).

## Get started

For local development of frontend. Push changes to master branch to test them on
[the staging environment](https://beta.u4.no).

You probably need access the heroku apps if you want to test services locally.
The frontend layer should work out of the box.

```sh
heroku config -s --app u4-frontend | tr -d "'" > .env # get env keys for API access
npm install # install dependencies the first time
npm run dev
```

Deploy changes to production once staging is stable by promoting the staging app
on Heroku.

For local development of backend

```sh
cd backend
sanity install # install dependencies the first time
sanity start
```

Deploy changes for Sanity with `sanity deploy`. Remember to commit and push
changes to git as well.

## Stack

* Headless CMS: [sanity.io](https://sanity.io)
* React with Server-side Rendering: [next.js](https://github.com/zeit/next.js/)
* Syncronization services: [node.js](https://nodejs.org/en/)
* Test suite: [jest](https://facebook.github.io/jest/)
* Frontend hosting: [heroku](https://heroku.com)
* PDF-generator: [DocRaptor](https://docraptor.com/doc_logs) with
  [PrinceXML](https://www.princexml.com/)
* Text editor analysis: [readable.io](https://readable.io)
