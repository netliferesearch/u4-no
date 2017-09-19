import React, { Component } from 'react';
import { Layout, Article, ExtendedBlockContent } from '../components';
import { DownArrowButton } from '../components/buttons';
import TopicContentNavigation from '../components/TopicContentNavigation';
import Link from 'next/link';
import materialize from '../helpers/materialize';

const sanityClient = require('@sanity/client');

export default class extends Component {
  static async getInitialProps({ query }) {
    const client = sanityClient({ projectId: '1f1lcoov', dataset: 'production', token: '' });
    const { id = '' } = query;
    const sanityQuery = `*[_id == "${id}"]`;
    const topic = (await client.fetch(sanityQuery))[0];
    const materialized = await materialize(topic);
    return { topic: materialized };
  }
  constructor(props) {
    super(props);
    const {
      topic = {
        title: 'loading topic',
      },
    } = props;
    this.state = {
      topic,
    };
  }
  render() {
    const { topic } = this.props;
    const {
      title = '',
      longTitle = '',
      explainerText = 'Publication has no explainerText',
      featuredImage,
      parent = {},
      introduction = [],
      agenda = [],
      advisors = [],
      resources = [],
    } = topic;
    return (
      <Layout>
        <div className="o-wrapper">
          <p>
            Tilbake til {' '}
            <Link href={'/topics'}>
              <a>topics oversikt</a>
            </Link>
          </p>
          <h1 className="c-topic-page_title">{title}</h1>
          <h2 className="c-topic-page__longTitle u-margin-bottom">{longTitle}</h2>
          <DownArrowButton text="Browse our resources" />

          <section className="c-boxOnImage u-margin-bottom-huge">
            {
              featuredImage &&
                <figure className="c-boxOnImage__figure">
                  <img alt={featuredImage.asset.altText} src={featuredImage.asset.url} />
                </figure>
            }
            <div className="c-boxOnImage__body">
              <p>{explainerText}</p>
              <ul>See also
                <li>Area 1 ></li>
                <li>Area 2 ></li>
                <li>Area 3 ></li>
              </ul>
              <DownArrowButton modifier="secondary" text="Talk to one our of advisors" onClick={() => console.log('clicked!')} />
            </div>
          </section>
          <TopicContentNavigation
            title="Read our essential guide"
            summary="Let us walk you through the basics of this topic"
          >
            <ExtendedBlockContent content={introduction} />
          </TopicContentNavigation>

          <TopicContentNavigation
            title="Get the bigger picture"
            summary="Read our research and policy agenda to see where things are at with this topic world wide."
          >
            <ExtendedBlockContent content={agenda} />
          </TopicContentNavigation>

          <TopicContentNavigation
            title="U4 Publications"
            summary="Read our recommended publications"
          >
            <ExtendedBlockContent content={introduction} />
          </TopicContentNavigation>

          <TopicContentNavigation
            title="Resources"
            summary="Comments, recommendations, case studies, toolkits"
          >
            <ExtendedBlockContent content={resources} />
          </TopicContentNavigation>

        </div>
      </Layout>
    );
  }
}
