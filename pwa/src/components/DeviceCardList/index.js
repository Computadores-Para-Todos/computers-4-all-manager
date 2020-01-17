import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Header } from 'semantic-ui-react';

import DeviceCard from '../DeviceCard';

import styles from './styles';

/**
 *  Lista de carta de dispositivos
 *
 *  @returns {React} A lista de dispositivos renderizada
 */
function DeviceCardList({ status, data, onSelect }) {
  return (
    <Segment style={styles.container}>
      <Header size="medium" as="h3">
        {status.title}
      </Header>
      {data.map(device => (
        <DeviceCard key={device.id} title={status.title} data={device} onSelect={onSelect} />
      ))}
    </Segment>
  );
}

DeviceCardList.propTypes = {
  status: PropTypes.shape({
    title: PropTypes.string.isRequired
  }),
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default DeviceCardList;
