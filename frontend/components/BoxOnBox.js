import React from 'react';
import { Link } from '../routes';
import { DownArrowButton } from '../components/buttons';
import { LinkList } from '../components';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'boxOnBox',
  prefix: 'c-',
});

const BoxOnBox = ({ left = '', right = '' }) => (
  <div {...classes()}>
    <div {...classes('left')}>
      <p><strong>U4 workshops</strong></p>
      <p>We prepare and facilitate two-day tailor-made  workshops for U4 partners and local counterparts. We can help you bring momentum to local processes. 8 different topics are currently on offer.</p>
      <LinkList
        content={[{ title: 'Read more', link: '#' }]}
        otherClasses="u-margin-top-none"
      />
    </div>
    <div {...classes('right')}>
      <p><strong>Current workshop topics</strong></p>
      <p>Corruption is a sensitive topic. A neutral forum to discuss it openly helps different agents of change find each other. Our advisers facilitate dialogues between development partners at U4 in-country workshops. During the past decade we’ve held over 60 workshops for our partners and their local counterparts. </p>

      <p>We can also assist with staff training and policy advice at headquarters. Or would you like to meet us at a conference? We gladly share our insights at research and policy events, to help advance general anti-corruption knowledge.</p>
    </div>
  </div>
);

export default BoxOnBox;
