import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Header, Message, Transition } from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import moment from 'moment';

import styles from './styles';

import UserForm from './UserForm';
import api from '../../services/api';

const formSchema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  document: Yup.string().required('O documento é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .when('addingUser', (addingUser, schema) => (addingUser ? schema.required('A senha é obrigatória') : schema)),
  gender: Yup.string()
    .oneOf(['male', 'female'])
    .required('O gênero é obrigatório'),
  birthday: Yup.string().required('A data de nascimento é obrigatória'),
  phone: Yup.string().required('O número de telefone é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  role: Yup.string()
    .oneOf(['voluntary', 'admin'])
    .required('A função é obrigatória'),
  status: Yup.string()
    .oneOf(['active', 'inactive'])
    .required('O status é obrigatório')
});

/**
 *  Conteiner do formulário de edição de usuários, responsável por carregar
 *  dados da API e por inserir um novo usuário ou atualizar um usuário existente
 *
 *  @returns {React} Página de lista de usuários renderizada
 */
function UserFormContainer() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const { id } = useParams();

  const requisitionSettings = useMemo(
    () =>
      user
        ? {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        : {},
    [user]
  );

  // Faz a requisição dos dados de usuário ao banco e popula a varaivel `data`
  const loadUserData = useCallback(async () => {
    if (id === 'add') return;
    if (!user) return;
    setLoading(true);
    try {
      const { data: userData } = await api.get(`/users/${id}`, requisitionSettings);
      userData.birthday = moment(userData.birthday).format('DD/MM/YYYY');
      setData(userData);
      setError(null);
    } catch (error) {
      setError(error.response ? error.response.data.error : error.message);
    }
    setLoading(false);
  }, [requisitionSettings, user, id]);

  const handleSubmit = useCallback(
    async values => {
      console.log(values);
      setLoading(true);
      try {
        if (id === 'add') {
          await api.post('/users', { ...values, birthday: moment(values.birthday, 'DD/MM/YYYY').format() }, requisitionSettings);
        } else {
          await api.put(`/users/${id}`, { ...values, birthday: moment(values.birthday, 'DD/MM/YYYY').format() }, requisitionSettings);
        }
        setError(null);
        setShowToast(true);
        setTimeout(() => {
          history.push('/users');
        }, 2000);
      } catch (error) {
        console.log(error.response);
        setError(error.response ? error.response.data.error : error.message);
      }
      setLoading(false);
    },
    [id, requisitionSettings, history]
  );

  // Ao carregar o componente, o usuário é lido do localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
  }, []);

  // Após o usuário ter sido lido do localStorage, os dados da tabela são carregados
  useEffect(() => {
    loadUserData();
  }, [user, loadUserData]);

  return (
    <>
      <Header as="h2" style={styles.pageHeader}>
        Usuários
      </Header>
      {showToast && (
        <Transition transitionOnMount animation="slide down">
          <Message floating positive header="Salvo com sucesso" content="Você será redirecionado em breve" />
        </Transition>
      )}
      <UserForm
        addingUser={id === 'add'}
        data={{ addingUser: id === 'add', ...data }}
        loading={loading}
        error={error}
        onSubmit={handleSubmit}
        validationSchema={formSchema}
      />
    </>
  );
}

export default UserFormContainer;
