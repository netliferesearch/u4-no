import React from 'react';
import { Link } from '../routes';
import { Layout } from '../components';

export default () => (
  <Layout>
    <div className="o-wrapper">
      <section className="o-wrapper-inner">
        <form>
          <label>Search u4</label>
          <input name="search"/>
          <button type="submit" value="Search">Search</button>
        </form>
      </section>
      <section className="o-wrapper-inner">
        <h1>Welcome to u4.no</h1>
        <p>This is what we do at U4, and a little bit why we do it. We want you to trust that we are REALLY good at what we do. This is why our stuff
          is relevant for you. And here is how to find stuff that we think is useful for you in your anti-corruption work. Are you looking for a
          specific <Link route="/topics"><a>topic</a></Link>? Or a <Link route="/publications"><a>publication</a></Link> or another resource of some kind? Or
          do you want to ask our helpdesk about something? Here is great course
          you can take if you are a partner. <Link route="/services/workshops"><a>Workshops</a></Link> are also on offer.</p>
          <Link route="/services/online-training"><a>Online training</a></Link>  <Link route="/search"><a>Search</a></Link>
      </section>
    </div>
  </Layout>
);
