import React, {Component} from 'react';
import {Layout} from '../../components';
import BlockContent from '@sanity/block-content-to-react';
const sanityClient = require('@sanity/client');

export default class extends Component {
  static async getInitialProps({query}) {
    const client = sanityClient({projectId: '1f1lcoov', dataset: 'production', token: ''});
    const {
      id = ''
    } = query;
    const sanityQuery = `*[_id == "${id}"]`
    const publication = (await client.fetch(sanityQuery))[0];
    return {publication}
  }
  constructor(props) {
    super(props);
    const {
      publication = {
        title: "loading publication"
      }
    } = props;
    this.state = {
      publication
    };
  }
  render() {
    return (
      <Layout>
        <article>
          <p className="description">U4 issue | Jul 2017</p>
          <h1>{this.props.publication.title}</h1>
          <h1>{this.props.publication.subtitle}</h1>

          <p className="byline">By Anthony Nownes - July 2017</p>
          <p>{this.props.publication._updatedAt}</p>
          <p className="byline">Bergen: Chr. Michelsen Institute (U4 Issue 8-2017) 28 p.</p>
          <p className="c-lead">{this.props.publication.lead}</p>
          <BlockContent blocks={this.props.publication.content}/>

        </article>
      </Layout>
    )
  }
}
