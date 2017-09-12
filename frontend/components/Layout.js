import React, { Component } from 'react';
import Link from 'next/link';
import {
  HeadComponent
} from '../components'

export default ({title, description, children = []}) => (
  <div>
    <HeadComponent title={title} description={description} />
    <div className="o-wrapper">
      <div className="c-top-bar">
        <a href="/">
          <img className="c-top-bar__logo" alt="The U4 logo" src="/static/u4-logo.svg" />
        </a>
      </div>
    </div>
    {children}
  </div>
)
