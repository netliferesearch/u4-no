import React, { Component } from 'react';
import { Link } from '../routes';
import { HeadComponent } from '../components';

export default ({ title, description, children = [] }) => (
  <div>
    <HeadComponent title={title} description={description} />
    <div className="o-wrapper">
      <div className="c-top-bar">
        <Link route="/">
          <a>U4.no</a>
        </Link>
      </div>
    </div>
    {children}
  </div>
);
