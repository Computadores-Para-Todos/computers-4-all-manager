import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DeviceCard from '.';

export const dummyDevice = {
  id: 1,
  title: 'Notebook',
  type: 'computer',
  donator: {
    name: 'John Smith'
  },
  comments: [],
  collectedAt: '2019-12-22',
  createdAt: '2019-12-18'
};

storiesOf('DeviceCard', module).add('default', () => <DeviceCard data={dummyDevice} onSelect={action('onSelect')} />);
