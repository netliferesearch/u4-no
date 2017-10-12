import React, { Component } from 'react';
import sanityClient from '@sanity/client';

import { Link } from '../routes';

class BreadCrumb extends Component {
  constructor(props) {
    super(props);
    this.state = { data: false };
  }

  componentWillMount() {
    const client = sanityClient({
      projectId: '1f1lcoov',
      dataset: 'production',
      token: '',
      useCdn: false,
    });
    const sanityQuery = '*[_id == $id][0]';
    const { url = {} } = this.props;
    const { query = {} } = url;
    const { refid = '' } = query;
    const sanityParams = { id: refid };
    client.fetch(sanityQuery, sanityParams).then((data) => {
      this.setState(() => ({ data }));
    });
  }

  render() {
    return (
      <div>
        {!this.state.data && <div />}
        {this.state.data &&
          this.state.data._type === 'topics' && (
            <Link route="topic.entry" params={{ slug: this.state.data.slug.current }}>
              <a>← {this.state.data.title}</a>
            </Link>
          )}
        {this.state.data &&
          this.state.data._type === 'publication' && (
            <Link route="publication.entry" params={{ slug: this.state.data.slug.current }}>
              <a>{this.state.data.title}</a>
            </Link>
          )}
      </div>
    );
  }
}

export default BreadCrumb;
