import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Segment, Header, Divider, Table, Button, Popup, Input } from 'semantic-ui-react';

import styles from './styles';

/**
 *  View da lista de usuários
 *
 *  @returns {React} Tabela de usuários renderizada
 */
function UserList({ data, onDelete, onEdit }) {
  const [searchText, setSearchText] = useState('');

  // Ao clicar em deletar, o sistema deve confirmar a intenção do usuário
  const handleDelete = (id, name) => {
    if (window.confirm(`Deseja apagar o registro de ${name}?`)) {
      onDelete(id);
    }
  };

  return (
    <Segment style={styles.segment}>
      <Header as="h2">Lista</Header>
      <Divider />
      <Input
        icon="search"
        value={searchText}
        onChange={(_, target) => {
          setSearchText(target.value);
        }}
        placeholder="Buscar na tabela..."
      />
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Telefone</Table.HeaderCell>
            <Table.HeaderCell>Ações</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data
            .filter(({ name, email, phone }) => {
              const lowerSearch = searchText.toLowerCase();
              return name.toLowerCase().includes(lowerSearch) || email.toLowerCase().includes(lowerSearch) || phone.includes(lowerSearch);
            })
            .map(({ id, name, email, phone }) => (
              <Table.Row key={id}>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>
                  <a href={`mailto:${email}`}>{email}</a>
                </Table.Cell>
                <Table.Cell>
                  <a href={`https://api.whatsapp.com/send?phone=${phone.replace(/[+ ()-]/g, '')}`}>{phone}</a>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Popup
                    content="Editar usuário"
                    trigger={<Button color="green" onClick={() => onEdit(id)} style={styles.button} icon="edit" />}
                  />

                  <Popup
                    content="Apagar usuário"
                    trigger={<Button color="red" onClick={() => handleDelete(id, name)} style={styles.button} icon="trash" />}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </Segment>
  );
}

const userItem = PropTypes.shape({
  /** Nome do usuário */
  id: PropTypes.string,
  /** Nome do usuário */
  name: PropTypes.string,
  /** Email do usuário */
  email: PropTypes.string,
  /** Telefone do usuário */
  phone: PropTypes.string.isRequired
});

UserList.propTypes = {
  /** Lista de usuários a ser listado */
  data: PropTypes.arrayOf(userItem).isRequired,
  /** Callback chamada ao clicar no botão de editar */
  onDelete: PropTypes.func.isRequired,
  /** Callback chamada ao clicar no botão de apagar */
  onEdit: PropTypes.func.isRequired
};

export default UserList;
