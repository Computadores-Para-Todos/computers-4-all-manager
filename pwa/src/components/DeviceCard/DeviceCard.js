import React from 'react';
import PropType from 'prop-types';
import { Segment, Label, Container, Icon, Header } from 'semantic-ui-react';
import { parseISO, differenceInCalendarDays } from 'date-fns';

import styles from './styles';

/**
 *
 */
function DeviceCard({ data, onSelect }) {
  return (
    <Segment color="green" style={{ width: 335, margin: 30 }}>
      <Header style={{ cursor: 'pointer' }} onClick={() => onSelect(data.id)} size="small" as="h4" href="">
        #{data.id} - {data.title}
      </Header>
      <p>Doador: {data.donator.name}</p>
      <Label size="small">
        <Icon name="comment" /> {data.comments.length}
      </Label>
      <Label size="small">Conosco à {differenceInCalendarDays(new Date(), parseISO(data.createdAt))} dias</Label>
      <Label size="small">Doação iniciada à {differenceInCalendarDays(new Date(), parseISO(data.collectedAt))} dias</Label>
    </Segment>
  );
}

DeviceCard.propTypes = {
  /** Dados do dispositivo */
  data: PropType.shape({
    id: PropType.number.isRequired,
    title: PropType.string.isRequired,
    createdAt: PropType.string.isRequired,
    collectedAt: PropType.string.isRequired
  }),
  /** Callback chamada ao clicar no dispositivo */
  onSelect: PropType.func.isRequired
};

export default DeviceCard;
