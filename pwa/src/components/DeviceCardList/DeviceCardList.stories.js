import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DeviceCardList from '.';

import devices from '../../../.storybook/mocks/devices.json';
const status = { id: 1, title: 'Avaliando', displayOrder: 0, showOnGrid: true };

storiesOf('DeviceCardList', module).add('default', () => (
  <DeviceCardList status={status} data={devices.slice(0, 5)} onSelect={action('onSelect')} />
));
