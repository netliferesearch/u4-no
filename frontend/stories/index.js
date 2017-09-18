import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import '../static/css/main.css';

import { Figure, Layout, PublicationArticle, TopicArticle } from '../components';
import { DownArrowButton } from '../components/buttons';

import topicArticle from './exampleContent/topicArticle';

storiesOf('Page Elements', module).add('Figure', () => (
  <Figure
    {...{
      asset: {
        url: 'https://source.unsplash.com/random',
      },
      caption: 'This is an cation',
      license: 'cc0',
      licensor: 'Photographer',
    }}
  />
))
.add('Layout', () => (
  <Layout
    title='This is an title'
    description='This is a description'
  >
    <p>lorem12</p>
  </Layout>
))
.add('Topic Article', () => (
  <TopicArticle
    content={topicArticle}
  />
))
.add('Buttons', () => (
  <DownArrowButton onClick={action('Clicked!')} />
));
