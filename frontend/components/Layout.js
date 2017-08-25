import React, { Component } from 'react';
import Link from 'next/link';
import {
  HeadComponent
} from '../components'

export default ({title, description, children = []}) => (
  <div>
    <HeadComponent title={title} description={description} />
    {children}
  </div>
)
