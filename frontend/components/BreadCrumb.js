import React, { Component } from 'react';
import PropTypes from 'prop-types';
import buildUrl from '../helpers/buildUrl'
import client from '../helpers/sanity-client-config'
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
  static propTypes = {
    data: PropTypes.shape({
      title: PropTypes.string,
    }).isRequired,
    url: PropTypes.shape({
      current: PropTypes.string,
    }).isRequired
  }

  constructor(props) {
    super(props);
    this.state = { data: props.data };
  }

  componentWillMount() {
    if (this.state.data) {
      return; // no need to fetch data if we got link data passed in.
    }
    const sanityQuery = '*[slug.current == $ref][0]';
    const {
      url: {
        query: {
          ref = '',
        } = {},
      } = {},
    } = this.props;
    const sanityParams = { ref };
    if (ref) {
      client.fetch(sanityQuery, sanityParams).then((data) => {
        this.setState(() => ({ data }));
      });
    }
  }

  render() {
    if(!this.state.data) return <div></div>
    const { data = { title: '' } } = this.state
    const { title = '' } = data
    return (
      <div className="c-breadcrumb">
        {data && (
          <Link route={buildUrl(data)}>
            <a className="c-breadcrumb__link">← {title}</a>
          </Link>
        )}
      </div>
    );
  }
}

export default BreadCrumb;
