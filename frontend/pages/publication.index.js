import React, { Component } from 'react';
import moment from 'moment';
import BEMHelper from 'react-bem-helper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateSearchSorting } from '../helpers/redux-store';
import DataLoader from '../helpers/data-loader';

import { Link } from '../routes';
import buildUrl from '../helpers/buildUrl';

import { Layout, Footer, AuthorList, EditorList } from '../components/';

const classes = BEMHelper({
  name: 'search-results',
  prefix: 'c-',
});

class Publications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        publications: [],
      },
    };
  }

  render() {
    const { url = {} } = this.props;
    const { data: { publications = [] } } = this.state;

    return (
      <Layout
       headComponentConfig={{
         title: 'Publications',
         url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
       }}
     >
       <div className="o-wrapper-inner">
         <h1 className="c-topic-page_longTitle u-margin-bottom-huge">Publications</h1>
         <ul {...classes('content')}>
           {publications.map(({
               _id,
               _type,
               slug = {},
               title = '',
               subtitle = false,
               authors = false,
               editors = false,
               publicationType = false,
               date = {},
               reference = '',
               publicationNumber = false,
             }) => (
               <li {...classes('items')} key={_id}>
                 <span {...classes('items-type')}>
                   {publicationType && <span>{publicationType.title}</span>}
                   {!publicationType && <span>{_type}</span>}
                 </span>
                 <span {...classes('items-date')}>
                   {date && moment(date.utc).format('DD.MM.YYYY')}
                 </span>
                 <br />
                 <Link to={buildUrl({ _type, slug })}>
                   <a {...classes('items-title')}>{title}</a>
                 </Link>
                 <br />
                 <span {...classes('items-subtitle')}>{subtitle}</span>
                 {authors.length ? (
                   <div>
                     <AuthorList authors={authors} />
                     <br />
                   </div>
                 ) : null}
                 {editors.length ? (
                   <div>
                     <EditorList editors={editors} />
                     <br />
                   </div>
                 ) : null}
                 <div>
                   {publicationNumber
                     ? `${publicationType.title} ${publicationNumber}`
                     : `${publicationType.title} ${reference}`}
                 </div>
               </li>
             ))}
         </ul>
       </div>
       <Footer />
     </Layout>
    );
  }
}

export default DataLoader(Publications, {
  queryFunc: () => ({
    sanityQuery:
      '{ "publications": *[_type in ["publication"]][0..1000]{_id_type,slug,title,subtitle,publicationType,date,reference,publicationNumber, "authors": authors[]->{firstName, surname, slug}, "editors": editors[]->{firstName, surname, slug},publicationType->{title}}|order(date.utc desc) }',
  }),
});
