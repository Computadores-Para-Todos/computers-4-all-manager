import React, { useState, useEffect, useCallback } from 'react';
import { Header, Message, Button, Icon } from 'semantic-ui-react';
import { useHistory, Link } from 'react-router-dom';

import api from '../../services/api';
import UserList from './UserList';
import styles from './styles';

/**
 *  Conteiner da lista de usuários, responsável por carregar dados da API e por
 *  deleter ou redirecionr para pagina de edição ou inclusão
 *
 *  @returns {React} Página de lista de usuários renderizada
 */
function UserListContainer() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const history = useHistory();

  // Faz a requisição da lista de usuário ao banco e popula a varaivel `data`
  const loadData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data } = await api.get('/users', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setData(data);
    } catch (error) {
      setError(error.response ? error.response.data.error : error.message);
    }
    setLoading(false);
  }, [user]);

  // Callback chamada ao apagar um usuário
  const handleDelete = useCallback(
    async id => {
      try {
        await api.delete(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        loadData();
      } catch (error) {
        setError(error.response ? error.response.data.error : error.message);
      }
    },
    [user, loadData]
  );

  // Callback chamada ao editar um usuário
  const handleEdit = useCallback(
    id => {
      history.push(`/users/${id}`);
    },
    [history]
  );

  // Callback chamada ao editar um usuário
  const handleInclude = useCallback(() => {
    history.push(`/users/add`);
  }, [history]);

  // Ao carregar o componente, o usuário é lido do localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
  }, []);

  // Após o usuário ter sido lido do localStorage, os dados da tabela são carregados
  useEffect(() => {
    loadData();
  }, [user, loadData]);

  return (
    <>
      <Header as="h2" style={styles.pageHeader}>
        Usuários
      </Header>
      {error && <Message negative header="Não foi possível carregar lista de usuários" content={error} />}
      <UserList loading={loading} data={data} onDelete={handleDelete} onEdit={handleEdit} onInclude={handleInclude} />
      <Button floated="right" as={Link} to="/users/add" icon labelPosition="left" primary size="large">
        <Icon name="user" /> Incluir Usuário
      </Button>
    </>
  );
}

export default UserListContainer;
