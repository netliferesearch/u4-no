import React, { Component } from 'react';
import sortBy from 'lodash/sortBy';
import { Link } from '../routes';
import { Layout, Footer, Team } from '../components';
import BreadCrumb from '../components/BreadCrumb';
import DataLoader from '../helpers/data-loader';

class Persons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGroup: 1,
    };
    this.changeGroup = this.changeGroup.bind(this);
  }

  changeGroup(group) {
    this.setState({
      activeGroup: group,
    });
  }

  render() {
    console.log(this.props)
    const { frontpage, persons, helpdesk, affiliatedexperts, url } = this.props;
    return (
      <Layout
        headComponentConfig={{
          title: frontpage.title,
          description: frontpage.lead,
          url: url.asPath ? `beta.u4.no${url.asPath}` : '',
        }}
      >
        <h1 className="c-article__title c-article__title--center">{frontpage.title}</h1>
        <BreadCrumb url={url} />
        <div className="c-article__lead c-article__lead--center">{frontpage.lead}</div>
        <div className="c-filters--standalone">
          <div className="c-filters__label--standalone">
            Filter people by:
            <button className="c-filters__item--standalone" onClick={() => this.changeGroup(1)}>
              <a>U4 Team</a>
            </button>
            <button className="c-filters__item--standalone" onClick={() => this.changeGroup(2)}>
              <a>U4 Helpdesk</a>
            </button>
            <button className="c-filters__item--standalone" onClick={() => this.changeGroup(3)}>
              <a>Affiliated Experts</a>
            </button>
          </div>
        </div>
        <div className="o-wrapper c-article">
          {this.state.activeGroup === 1 ? (
            <div id="advisors">
              <h2 className="c-article__title c-article__title--center">U4 TEAM</h2>
              <Team
                light
                applyJob
                members={sortBy(persons, ({ firstName = '' }) => firstName.toUpperCase())}
              />
            </div>
          ) : null}
          {this.state.activeGroup === 2 ? (
            <div id="advisors2">
              <h2 className="c-article__title c-article__title--center">U4 HELPDESK</h2>
              <Team
                light
                members={sortBy(helpdesk, ({ firstName = '' }) => firstName.toUpperCase())}
              />
            </div>
          ) : null}
          {this.state.activeGroup === 3 ? (
            <div id="advisors3">
              <h2 className="c-article__title c-article__title--center">AFFILIATED EXPERTS</h2>
              <Team
                light
                members={sortBy(affiliatedexperts, ({ firstName = '' }) => firstName.toUpperCase())}
              />
            </div>
          ) : null}
        </div>
        <Footer />
      </Layout>
    );
  }
}

export default DataLoader(Persons, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
      "frontpage": *[_id == "627b8d42-d8f7-4cf6-9567-f6337678b688"][0],
      "persons": *[_type == "person" && references("0e1b0ebc-e016-4d2b-97e8-859b91e3e147")][0..100]{..., "image": image.asset->url[0], affiliations},
      "helpdesk": *[_type == "person" && references("17ec3576-0afa-4203-9626-a38a16b27c2a")][0..100]{..., "image": image.asset->url[0], affiliations},
      "affiliatedexperts": *[_type == "person" && references("3babc8f1-9e38-4493-9823-a9352b46585b")][0..100]{..., "image": image.asset->url[0], affiliations},
    }`,
  }),
  materializeDepth: 2,
});
