import React from 'react';
import PropTypes from 'prop-types';
import { Message, Dimmer, Loader } from 'semantic-ui-react';

import DeviceCardList from '../DeviceCardList';

import styles from './styles';

/**
 * View da lista de Status com a lista de cards
 *
 * @returns {React} Lista de Status renderizada
 */
function StatusDeviceList({ data, onSelect, loading, error }) {
  return (
    <div style={styles.container}>
      {loading && (
        <Dimmer page active inverted>
          <Loader inverted>Carrgando</Loader>
        </Dimmer>
      )}
      {error && <Message error header="Erro" content={error} />}
      {data
        .filter(status => status.showOnGrid)
        .map(({ devices, ...status }) => (
          <DeviceCardList key={status.id} status={status} data={devices} onSelect={onSelect} />
        ))}
    </div>
  );
}

StatusDeviceList.propTypes = {
  /** Lista de Status com os dispositivos populados */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      devices: PropTypes.array.isRequired,
      title: PropTypes.string.isRequired,
      showOnGrid: PropTypes.bool.isRequired
    })
  ).isRequired,
  /** Callback chamada ao selecionar um card */
  onSelect: PropTypes.func.isRequired,
  /** Deve mostrar o loader */
  loading: PropTypes.bool,
  /** Mensagem de Erro a ser exibida */
  error: PropTypes.string
};

StatusDeviceList.defaultTypes = {
  loading: false,
  error: false
};

export default StatusDeviceList;
