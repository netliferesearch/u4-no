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
    this.state = { data: props.data };
  }

  componentWillMount() {
    if (this.state.data) {
      return; // no need to fetch data if we got link data passed in.
    }
    const client = sanityClient({
      projectId: '1f1lcoov',
      dataset: 'production',
      token: '',
      useCdn: true,
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
    const { title } = this.state.data;
    const buildUrl = ({ _type = 'notype', slug = {} }) => {
      if (_type === 'publication') {
        return `/publications/${slug.current}`;
      } else if (_type === 'topics') {
        return `/topics/${slug.current}`;
      }
      return slug.current;
    };

    return (
      <div>
        {this.state.data && (
          <Link route={buildUrl(this.state.data)}>
            <a>← {title}</a>
          </Link>
        )}
      </div>
    );
  }
}

export default BreadCrumb;
