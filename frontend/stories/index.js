import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import '../static/css/main.css';

import { Figure, Layout, TopicArticle, PullQuote } from '../components';
import { DownArrowButton } from '../components/buttons';

import topicArticle from './exampleContent/topicArticle.json';

storiesOf('Typography', module)
  .add('Headings', () => (
    <div>
      <h2>Typography</h2>
      <h1>H1 Heading</h1>
      <h2>H2 Heading</h2>
      <h3>H3 Heading</h3>
    </div>
  ))
  .add('Body', () => (
    <div className='c-article o-grid-container-sub-div'>
      <p className='o-grid-container__item-standard'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde nisi nobis tempore nesciunt sequi adipisci vitae, repudiandae accusantium quisquam ipsam, neque accusamus inventore libero esse fugit ad modi officia perferendis veritatis. Totam architecto esse culpa nesciunt accusamus iste tempore quasi provident quae neque a laboriosam dolorem nam voluptatum repudiandae nobis ipsam ullam, adipisci explicabo quod saepe consequatur pariatur enim? Maiores omnis non ipsa similique saepe facilis excepturi nemo accusamus! Sed non ad dolorem laudantium vitae quisquam iusto, neque, nostrum architecto repellat dolores voluptates culpa expedita veniam odio debitis ducimus sunt, similique beatae a optio saepe laboriosam! Quos vel deserunt sit doloribus facilis, voluptates, consectetur, sint fuga modi ut nesciunt. Neque repudiandae facilis unde hic ipsa. Pariatur atque aspernatur quasi quibusdam esse, temporibus reprehenderit excepturi, illum nisi sit iste, officiis consequatur quam maxime! Earum veritatis vitae, dicta repellendus fugit neque, ipsum voluptatibus a pariatur ducimus accusamus sequi est mollitia, corrupti sit consectetur aliquid! Accusamus corrupti itaque iusto architecto, laudantium animi rem impedit saepe repellendus autem atque porro eaque consectetur qui culpa maiores et mollitia explicabo aspernatur ab debitis incidunt assumenda. Eveniet, expedita porro commodi suscipit, quibusdam aperiam tenetur quo possimus harum minus exercitationem similique ipsam, voluptate ipsa vitae! Obcaecati, perferendis expedita.</p>
    </div>
  ))
  .add('Pullquote', () => (
    <main className="c-article o-grid-container-sub-div">
      <PullQuote>This is an PullQuote</PullQuote>
    </main>
  ));


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
  .add('Colors', () => (
    <div>
      <h2>Colors</h2>
      <div className="c-colorBox c-colorBox--brandDark">brand dark</div>
      <div className="c-colorBox c-colorBox--brandMedium">brand medium</div>
      <div className="c-colorBox c-colorBox--brandMain">brand main</div>
      <div className="c-colorBox c-colorBox--brandLight">brand light</div>
      <div className="c-colorBox c-colorBox--black">black</div>
      <div className="c-colorBox c-colorBox--grey">grey</div>
      <div className="c-colorBox c-colorBox--white">white</div>
      <div className="c-colorBox c-colorBox--contrast">Contrast</div>
    </div>
  ))
  .add('Layout', () => (
    <Layout
      title="This is an title"
      description="This is a description"
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
    <div>
      <h2>Button without text</h2>
      <DownArrowButton onClick={action('Clicked!')} />
      <h2>Button with text</h2>
      <DownArrowButton onClick={action('Clicked!')} text={'This is a button'} />

      <h2>Secondary button</h2>
      <DownArrowButton onClick={action('Clicked!')} text={'This is a button'} modifier="secondary" />
    </div>
  ))
  .add('Boxes', () => (
    <div>
      <div className="c-box c-box--main">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam odit nemo eum repellat doloribus accusamus quisquam exercitationem id voluptate alias.
      </div>
    </div>
  ));
