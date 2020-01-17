import React from 'react';
import { storiesOf } from '@storybook/react';

import StatusDeviceList from './StatusDeviceList';

import statusDevice from '../../../.storybook/mocks/statusDevice.json';

storiesOf('StatusDeviceList', module).add('default', () => <StatusDeviceList data={statusDevice} />);
