import React from 'react';
import { Link } from '../routes';
import { LayoutHomepage } from '../components';
import { U4LogoSquare } from '../components/icons';
import { MagnifyingGlass } from '../components/icons';

export default () => (
  <LayoutHomepage>
    <div className="o-wrapper">
      <section className="o-wrapper-inner o-wrapper--padded ">
        <div class="o-layout o-layout--center u-margin-bottom-huge">
          <U4LogoSquare />
        </div>
        <form className="c-search u-margin-bottom-huge">
          <label className="c-search__lable u-margin-bottom-small">Search for topics, publications, people and all the other stuff</label>
          <div className="c-search__content">
            <input className="c-search__input" name="search" placeholder="Search" />
            <button className="c-search__button" type="submit" value="Search"><MagnifyingGlass /></button>
          </div>
        </form>
      </section>
      <section className="o-wrapper-inner o-wrapper--padded u-margin-bottom-huge">
        <p className="c-introduction-text">
          Anti-corruption resources based on high-quality research to support your efforts to reduce the harmful impact of corruption on sustainable development.
          Browse by <Link route="/topics"><a>topic</a></Link> or <Link route="/publications"><a>publications.</a></Link> Are you <Link route="#"><a>U4 patrner</a></Link> staff? Take advantage of
          exclusive <Link route="/services/online-training"><a>online courses</a></Link>, <Link route="/services/workshops"><a>workshops</a></Link> or <Link route="#"><a>helpdesk.</a></Link></p>
      </section>
    </div>
  </LayoutHomepage>
);
