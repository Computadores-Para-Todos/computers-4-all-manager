import React from 'react';
import { Container } from 'semantic-ui-react';

import DeviceCardList from '../DeviceCardList';

import styles from './styles';

/**
 *
 */
function StatusDeviceList({ data, onSelect }) {
  return (
    <div style={styles.container}>
      {data
        .filter(status => status.showOnGrid)
        .map(({ devices, ...status }) => (
          <DeviceCardList key={status.id} status={status} data={devices} onSelect={onSelect} />
        ))}
    </div>
  );
}

export default StatusDeviceList;
