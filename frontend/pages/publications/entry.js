import React, {Component} from 'react';
import {Layout} from '../../components'
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

          <p className="byline">By Anthony Nownes - July 2017</p>
          <p className="byline">Bergen: Chr. Michelsen Institute (U4 Issue 8-2017) 28 p.</p>
          <p className="ingress">Can lobbying be a realistic and legitimate alternative to corruption in less developed countries?</p>
          <h2>Intro</h2>

          <p className="quotation">When national anti-corruption strategies yield no result, and a country’s corruption rankings do not improve.</p>
          <p>Anti‐corruption agencies (ACAs) are often considered a last resort against corruption and are expected to solve a problem that other institutions have failed to address effectively or may even be part of. When national anti‐corruption strategies yield no result, and a country’s corruption rankings do not improve, ACAs often take the brunt of the criticism. Anti‐corruption agencies (ACAs) are often considered a last resort against corruption and are expected to solve a problem that other institutions have failed to address effectively or may even be part of. When national anti‐corruption strategies yield no result, and a country’s corruption rankings do not improve, ACAs often take the brunt of the criticism. Anti‐corruption agencies (ACAs) are often considered a last resort against corruption and are expected to solve a problem that other institutions have failed to address effectively or may even be part of. When national anti‐corruption strategies yield no result, and a country’s corruption rankings do not improve, ACAs often take the brunt of the criticism.</p>
          <p>Anti‐corruption agencies (ACAs) are often considered a last resort against corruption and are expected to solve a problem that other institutions have failed to address effectively or may even be part of. When national anti‐corruption strategies yield no result, and a country’s corruption rankings do not improve, ACAs often take the brunt of the criticism. Anti‐corruption agencies (ACAs) are often considered a last resort against corruption and are expected to solve a problem that other institutions have failed to address effectively or may even be part of. When national anti‐corruption strategies yield no result, and a country’s corruption rankings do not improve, ACAs often take the brunt of the criticism. Anti‐corruption agencies (ACAs) are often considered a last resort against corruption and are expected to solve a problem that other institutions have failed to address effectively or may even be part of. When national anti‐corruption strategies yield no result, and a country’s corruption rankings do not improve, ACAs often take the brunt of the criticism.</p>
        </article>
      </Layout>
    )
  }
}
