import React, { Component } from 'react';
import sanityClient from '@sanity/client';

import { Link } from '../routes';

/**
 * The purpose of the BreadCrumb class is to mostly figure out by itself what
 * type of breadcrumb it needs to generate. It does this by looking at a
 * reference query param before figuring out what/how it needs to link back.
 *
 * We also provide means to override this link generation when we know enough
 * to build a breadcrumb without adding a reference query param.
 */
class BreadCrumb extends Component {
  constructor(props) {
    super(props);
    const { linkOverride = false } = props;
    this.state = { data: false, linkOverride };
  }

  componentWillMount() {
    if (this.state.linkOverride) {
      return; // no need to fetch data if we got link data passed in.
    }
    const client = sanityClient({
      projectId: '1f1lcoov',
      dataset: 'production',
      token: '',
      useCdn: false,
    });
    const sanityQuery = '*[slug.current == $ref][0]';
    const { url = {} } = this.props;
    const { query = {} } = url;
    const { ref = '' } = query;
    const sanityParams = { ref };
    client.fetch(sanityQuery, sanityParams).then((data) => {
      this.setState(() => ({ data }));
    });
  }

  render() {
    const renderLink = (state) => {
      const { _type, slug, title } = state.data;
      if (state.linkOverride) {
        const { template, params, title } = state.linkOverride;
        return (
          <Link route={template} params={params}>
            <a>← {title}</a>
          </Link>
        );
      } else if (_type === 'topics') {
        return (
          <Link route="topic.entry" params={{ slug: this.state.data.slug.current }}>
            <a>← {this.state.data.title}</a>
          </Link>
        );
      } else if (_type === 'publication') {
        return (
          <Link route="publication.entry" params={{ slug: this.state.data.slug.current }}>
            <a>← {this.state.data.title}</a>
          </Link>
        );
      }
      return null;
    };
    return <div>{renderLink(this.state)}</div>;
  }
}

export default BreadCrumb;
