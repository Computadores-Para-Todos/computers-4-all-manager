import React from 'react';
import PropType from 'prop-types';
import { Segment, Label, Icon, Header } from 'semantic-ui-react';
import { parseISO, differenceInCalendarDays } from 'date-fns';

import styles from './styles';

/**
 * Card do dispositivo
 *
 * @returns {React} componente renderizado
 */
function DeviceCard({ data, onSelect }) {
  return (
    <Segment color="green" style={styles.container}>
      <Header style={styles.header} onClick={() => onSelect(data.id)} size="small" as="h4" href="">
        #{data.id} - {data.title}
      </Header>
      <p>Doador: {data.donator.name}</p>
      <Label size="small">
        <Icon name="comment" /> {data.comments.length}
      </Label>
      {data.collectedAt && <Label size="small">Conosco à {differenceInCalendarDays(new Date(), parseISO(data.collectedAt))} dias</Label>}
      <Label size="small">Doação iniciada à {differenceInCalendarDays(new Date(), parseISO(data.createdAt))} dias</Label>
    </Segment>
  );
}

DeviceCard.propTypes = {
  /** Dados do dispositivo */
  data: PropType.shape({
    id: PropType.number.isRequired,
    title: PropType.string.isRequired,
    createdAt: PropType.string.isRequired,
    collectedAt: PropType.string,
    comments: PropType.array.isRequired,
    donator: PropType.shape({
      name: PropType.string.isRequired
    })
  }),
  /** Callback chamada ao clicar no dispositivo */
  onSelect: PropType.func.isRequired
};

export default DeviceCard;
