"use client";

import React, { Component } from 'react';
import { client as sanityClient } from './sanityClient.pico';
import Error404 from '../components/Error404';
import { limit } from '../components/search/SearchResults';

const elasticsearch = require('elasticsearch');

// anonymous has read access to elasticsearch index so this works
const client = new elasticsearch.Client({
  host: 'https://34f28f12080e435795254ec8886248ba.eu-central-1.aws.cloud.es.io/',
});

const aggregations = {
  minPublicationDateMilliSeconds: {
    min: {
      field: 'date.utc',
    },
  },
  maxPublicationDateMilliSeconds: {
    max: {
      field: 'date.utc',
    },
  },
  publicationTypes: {
    terms: {
      field: 'publicationTypeTitle.keyword',
      size: 100,
    },
  },
  contentTypes: {
    terms: {
      field: 'contentType',
      size: 100,
    },
  },
  topicTitles: {
    terms: {
      field: 'topicTitles',
      size: 100,
    },
  },
  filedUnderTopicNames: {
    terms: {
      field: 'filedUnderTopicNames',
      size: 100,
    },
  },
  languages: {
    terms: {
      field: 'languageName',
      size: 100,
    },
  },
  keywords: {
    terms: {
      field: 'keywordTerms',
      size: 200,
    },
  },
  countries: {
    terms: {
      field: 'countries',
      size: 200,
    },
  },
  regions: {
    terms: {
      field: 'regions',
      size: 100,
    },
  },
};
const doSearch = async ({ query }) => {
  // console.log('doSearch query:', query);
  const {
    search: searchQuery = '',
    sort = 'year-desc',
    filters: filterStr = '',
    searchPageNum = 1,
  } = query;
  const filters = filterStr.split(',').map(name => name.replace(/\|/g, ','));
  const activeFilterQueries = [];
  const topicNames = filters
    .filter(filter => /^topic-type-/gi.test(filter))
    .map(filter => /topic-type-(.*)/gi.exec(filter)[1]);
  if (topicNames.length > 0) {
    activeFilterQueries.push({ terms: { filedUnderTopicNames: topicNames } });
  }
  let searchQueryWithoutFilters = searchQuery;

  searchQueryWithoutFilters = searchQueryWithoutFilters.trim();
  const publicationNames = filters
    .filter(filter => /^pub-/gi.test(filter))
    .map(filter => /pub-(.*)/gi.exec(filter)[1])
    .reduce((acc, name) => {
      acc.push(name);
      return acc;
    }, []);
  if (publicationNames.length > 0) {
    activeFilterQueries.push({
      terms: { 'publicationTypeTitle.keyword': publicationNames },
    });
  }
  const countryNames = filters
    .filter(filter => /^country-/gi.test(filter))
    .map(filter => /country-(.*)/gi.exec(filter)[1]);
  if (countryNames.length > 0) {
    activeFilterQueries.push({ terms: { countries: countryNames }});
  }
  const regionNames = filters
    .filter(filter => /^region-/gi.test(filter))
    .map(filter => /region-(.*)/gi.exec(filter)[1]);
  if (regionNames.length > 0) {
    activeFilterQueries.push({ terms: { regions: regionNames }});
  }
  const keywordNames = filters
    .filter(filter => /^keyword-/gi.test(filter))
    .map(filter => /keyword-(.*)/gi.exec(filter)[1]);
  if (keywordNames.length > 0) {
    activeFilterQueries.push({ terms: { keywordTerms: keywordNames }});
  }
  const languageNames = filters
    .filter(filter => /^lang-type-/gi.test(filter))
    .map(filter => /lang-type-(.*)/gi.exec(filter)[1]);
  if (languageNames.length > 0) {
    activeFilterQueries.push({ terms: { languageName: languageNames } });
  }

  filters.forEach(filter => {
    activeFilterQueries.push({ term: { type: 'publication' } });
    if (/^year-from-/gi.test(filter)) {
      const yearFrom = /year-from-(.*)/gi.exec(filter)[1];
      activeFilterQueries.push({
        range: { 'date.utc': { gte: `${yearFrom}-01-01` } },
      });
    } else if (/^year-to-/gi.test(filter)) {
      const yearTo = /year-to-(.*)/gi.exec(filter)[1];
      activeFilterQueries.push({
        range: { 'date.utc': { lte: `${yearTo}-12-31` } },
      });
    }
  });

  // Need to have selected at least one filter, or started typing at least two
  // characters.
  if (activeFilterQueries.length === 0 && searchQueryWithoutFilters.length <= 2) {
    return;
  }

  try {
    const result = await client.search({
      index: process.env.ES_ENV ? `u4-${process.env.ES_ENV}-*` : 'u4-production-*',
      body: {
        query: {
          function_score: {
            query: {
              bool: {
                ...(activeFilterQueries.length > 0
                  ? {
                      filter: activeFilterQueries,
                    }
                  : {}),
                // At least one search query should match. Need to have this
                // to prevent weird results when using filters.
                minimum_should_match: 1,
                should: [
                  // if no query, yet active filters use match_all query to show results
                  ...(!searchQueryWithoutFilters && activeFilterQueries.length > 0
                    ? [{ match_all: {} }]
                    : []),
                ],
              },
            },
            boost: 1,
            functions: [
              {
                filter: [{ match: { type: 'publication' } }],
                weight: 5,
              },
            ],
          },
        },

        aggs: aggregations,
        sort: [{ 'date.utc': { order: 'desc' } }],
        /* eslint-disable no-nested-ternary */

        ...(searchPageNum > 1
          ? {
              from: searchPageNum * limit - limit,
              size: limit,
            }
          : {
              from: 0,
              size: limit,
            }),
        _source: [
          'title',
          'authors*',
          'slug*',
          'subtitle',
          'standfirst',
          'lead',
          'type',
          'date',
          'pubdate.*',
          'termTitle',
          'termContent',
          'topicTitle',
          'topicContent',
          'numberOfTopicResources',
          'url',
          'featuredImageUrl',
          'longTitle',
          'explainerText',
          'isAgendaPresent',
          'isBasicGuidePresent',
          'publicationType',
          'filedUnderTopicNames',
          'pdfFileUrl',
          'legacypdfFileUrl',
          'pdfThumbnailUrl',
        ],
      },
    });
    return result;
  } catch (e) {
    return {};
  }
};

export const getSearchAggregations = async () => {
  try {
    const result = await client.search({
      index: process.env.ES_ENV ? `u4-${process.env.ES_ENV}-*` : 'u4-production-*',
      body: {
        query: { match_all: {} },
        aggs: aggregations,
        size: 1,
      },
    });
    return result;
  } catch (e) {
    return {};
  }
};

const getSanityData = async () => {
  const sanityQuery = `*[_type=="frontpage" && slug.current == "publications"][0]{
      id,
      title,
      lead,
      sections,
      lead,
      "imageUrl": featuredImage.asset->url,
      "resources": resources[]->{
        _id,
        _type,
        "publicationType": publicationType->title,
        title,
        date,
        standfirst,
        topics[]->{title},
        "slug": slug.current,
        "titleColor": featuredImage.asset->metadata.palette.dominant.title,
        "imageUrl": featuredImage.asset->url,
        "imageBlurDataURL":featuredImage.asset->metadata.lqip,
        "pdfFile": pdfFile.asset->url,
      }[0..3],
    }`;

  const result = await sanityClient.fetch(sanityQuery, {});

  return result;
}

const PublicationsDataLoader = Child =>
  class DataLoader extends Component {
    static async getInitialProps(nextContext) {
      const { query, store } = nextContext;
      const { defaultSearchAggs = {} } = store.getState();
      // Use Promise.all so that we can fire off 1 or 2 two queries at once,
      // without one waiting for the other.
      const [sanityData,result] = await Promise.all([
        getSanityData(),
        doSearch({ query, defaultSearchAggs }),
        (async () => {
          if (defaultSearchAggs.length > 0) {
            return true;
          }
          // We do one search just to know how many possible aggregations
          // we have. Filters needs this if they want to display unmatched filters.
          const { aggregations } = await getSearchAggregations();
          return store.dispatch({
            type: 'SEARCH_UPDATE_DEFAULT_AGGS',
            defaultSearchAggs: aggregations,
          });
        })(),
      ]);
      store.dispatch({
        type: 'SEARCH_UPDATE_RESULTS',
        searchResults: result,
      });
      return { data: result, sanityData: sanityData };
    }
    render() {
      const { error } = this.props;
      if (error) {
        return <Error404 {...this.props} />;
      }
      return (
        <div>
          <Child {...this.props} />
        </div>
      );
    }
  };
export default PublicationsDataLoader;
