import React, { Component } from 'react';
import { Layout, Article } from '../components';
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
          <h2 className="c-topic-page__longTitle">{longTitle}</h2>
          <button className="c-topic-page__navigate--down">Browse our resources</button>
          <section>
            {
              featuredImage &&
                <figure>
                  <img alt={featuredImage.asset.altText} src={featuredImage.asset.url} />
                </figure>
            }
            <p>{explainerText}</p>
            <a>Talk to one our of advisors</a>
          </section>
          <section>
            <div>
              <div>
                <figure>
                  <svg></svg>
                </figure>
                <p>Read our Essential Guide to corruption and anti-corruption
                  efforts in the NRE sectiors</p>
              </div>
              <div>
                <figure>
                  <svg></svg>
                </figure>
                <p>Get the Bigger Pocture with our research and policy agenda</p>
              </div>
            </div>
          </section>
          <section>
            <h1>Our team is what sets us apart.</h1>

          </section>

          <ul>
            <li>
              <Link href={`/topics/article?id=${topic._id}&topicKey=introduction`}>
                <a>Basic guide</a>
              </Link>
              , read this to get informed about the field of {title}.
            </li>
            <li>
              <Link href={`/topics/article?id=${topic._id}&topicKey=agenda`}>
                <a>Research and policy</a>
              </Link>
              , here we show you the bigger picture of U4's work in the area of {title}. We introduce
              you to U4's research and policy agenda.
            </li>
          </ul>
          <h3>Resources</h3>
          <ul>
            {resources.map(({ _id, title }) => (
              <li key={_id}>
                <Link href={`/article?id=${_id}`}>
                  <a>{title}</a>
                </Link>
              </li>
            ))}
            </ul>
          </div>
      </Layout>
    );
  }
}
