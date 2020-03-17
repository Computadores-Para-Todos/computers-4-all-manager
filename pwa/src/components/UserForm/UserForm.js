import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Segment, Header, Divider, Form, Message, Button, Label } from 'semantic-ui-react';
import 'moment/locale/pt-br';
import { DateInput } from 'semantic-ui-calendar-react';
import InputMask from 'react-input-mask';

import styles from './styles';

/**
 * View do formulário de inclusão e edição de usuário
 *
 * @returns {React} Formulário renderizado
 */
function UserForm({ data, loading, error, addingUser, onSubmit, validationSchema }) {
  return (
    <Segment>
      <Header as="h3" style={styles.listHeader}>
        {addingUser ? 'Inserir usuário' : 'Atualizar dados'}
      </Header>
      <Divider />
      {error && <Message error header="Erro" content={error} />}
      <Formik
        enableReinitialize={true}
        initialValues={{
          addingUser: data.addingUser,
          name: data.name || '',
          document: data.document || '',
          birthday: data.birthday || '',
          phone: data.phone || '',
          email: data.email || '',
          password: data.password || '',
          gender: data.gender || '',
          role: data.role || '',
          status: data.status || ''
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values, touched, errors, handleSubmit, handleChange, handleBlur, setFieldValue, setFieldTouched }) => {
          return (
            <Form loading={loading} onSubmit={handleSubmit} noValidate={true}>
              <Form.Input
                fluid
                label="Nome"
                name="name"
                placeholder="Seu nome..."
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.name && touched.name
                    ? {
                        content: errors.name,
                        pointing: 'above'
                      }
                    : undefined
                }
                required
              />
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Documento"
                  name="document"
                  placeholder="Numero de documento..."
                  value={values.document}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    errors.document && touched.document
                      ? {
                          content: errors.document,
                          pointing: 'above'
                        }
                      : undefined
                  }
                  required
                />
                <Form.Field required error={errors.phone && touched.phone}>
                  <label>Telefone</label>
                  <InputMask
                    mask="DD-DDDDXXDDD?"
                    maskChar={null}
                    formatChars={{ D: '[0-9]', X: '[0-9-]', '?': '[0-9]' }}
                    name="phone"
                    placeholder="Seu numero de telefone..."
                    value={values.phone}
                    onChange={e => handleChange(e, e.target)}
                    onBlur={handleBlur}
                  />
                  {errors.phone && touched.phone && (
                    <Label prompt pointing>
                      {errors.phone}
                    </Label>
                  )}
                </Form.Field>
              </Form.Group>
              <Form.Input
                fluid
                label="Email"
                name="email"
                placeholder="Seu email..."
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.email && touched.email
                    ? {
                        content: errors.email,
                        pointing: 'above'
                      }
                    : undefined
                }
                required
              />
              <Form.Input
                fluid
                label="Senha"
                name="password"
                placeholder="Sua senha..."
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.password && touched.password
                    ? {
                        content: errors.password,
                        pointing: 'above'
                      }
                    : undefined
                }
                required={addingUser}
              />
              <Form.Group widths="equal">
                <Form.Field required error={errors.birthday && touched.birthday}>
                  <label>Data de nascimento</label>
                  <DateInput
                    name="birthday"
                    placeholder="Data de nascimento..."
                    dateFormat="DD/MM/YYYY"
                    value={values.birthday}
                    iconPosition="right"
                    closable
                    closeOnMouseLeave
                    onChange={(e, field) => {
                      if (field && field.name) {
                        setFieldValue(field.name, field.value);
                      }
                    }}
                    onBlur={(e, field) => {
                      if (field && field.name) {
                        setFieldValue(field.name, field.value);
                        setFieldTouched(field.name, true, true);
                      }
                    }}
                  />
                  {errors.birthday && touched.birthday && (
                    <Label prompt pointing>
                      {errors.birthday}
                    </Label>
                  )}
                </Form.Field>
                <Form.Select
                  fluid
                  label="Gênero"
                  name="gender"
                  placeholder="Selecione um gênero..."
                  value={values.gender}
                  options={[
                    { key: 'male', value: 'male', text: 'Masculino' },
                    { key: 'female', value: 'female', text: 'Feminino' }
                  ]}
                  onChange={(e, field) => {
                    if (field && field.name) {
                      setFieldValue(field.name, field.value);
                    }
                  }}
                  onBlur={(e, field) => {
                    if (field && field.name) {
                      setFieldValue(field.name, field.value);
                      setFieldTouched(field.name, true, true);
                    }
                  }}
                  error={
                    errors.gender && touched.gender
                      ? {
                          content: errors.gender,
                          pointing: 'above'
                        }
                      : undefined
                  }
                  required
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Select
                  fluid
                  label="Função"
                  name="role"
                  placeholder="Selecione uma função..."
                  value={values.role}
                  options={[
                    { key: 'admin', value: 'admin', text: 'Administrador' },
                    { key: 'voluntary', value: 'voluntary', text: 'Voluntário' }
                  ]}
                  onChange={(e, field) => {
                    if (field && field.name) {
                      setFieldValue(field.name, field.value);
                    }
                  }}
                  onBlur={(e, field) => {
                    if (field && field.name) {
                      setFieldValue(field.name, field.value);
                      setFieldTouched(field.name, true, true);
                    }
                  }}
                  error={
                    errors.role && touched.role
                      ? {
                          content: errors.role,
                          pointing: 'above'
                        }
                      : undefined
                  }
                  required
                />
                <Form.Select
                  fluid
                  label="Status"
                  name="status"
                  placeholder="Selecione um status..."
                  value={values.status}
                  options={[
                    { key: 'active', value: 'active', text: 'Ativo' },
                    { key: 'inactive', value: 'inactive', text: 'Inativo' }
                  ]}
                  onChange={(e, field) => {
                    if (field && field.name) {
                      setFieldValue(field.name, field.value);
                    }
                  }}
                  onBlur={(e, field) => {
                    if (field && field.name) {
                      setFieldValue(field.name, field.value);
                      setFieldTouched(field.name, true, true);
                    }
                  }}
                  error={
                    errors.status && touched.status
                      ? {
                          content: errors.status,
                          pointing: 'above'
                        }
                      : undefined
                  }
                  required
                />
              </Form.Group>
              <Button color="green" type="submit">
                Salvar
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Segment>
  );
}

UserForm.propTypes = {
  /** Valores iniciais dos campos do formulário */
  data: PropTypes.shape({
    name: PropTypes.string,
    document: PropTypes.string,
    gender: PropTypes.oneOf(['male', 'female', '']),
    birthday: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.oneOf(['admin', 'voluntary', '']),
    status: PropTypes.oneOf(['active', 'inactive', '']),
    password: PropTypes.string,
    addingUser: PropTypes.bool
  }),
  /** Callback chamada ao submeter o formulário */
  onSubmit: PropTypes.func.isRequired,
  /** Um novo usuário está sendo inserido */
  addingUser: PropTypes.bool,
  /** Deve mostrar o estado de carregamento */
  loading: PropTypes.bool,
  /** Mensagem de erro que deve ser mostrada */
  error: PropTypes.string,
  /** Esquema de validação a ser usado */
  validationSchema: PropTypes.object
};

UserForm.defaultProps = {
  data: {
    name: '',
    document: '',
    gender: '',
    birthday: '',
    phone: '',
    email: '',
    role: '',
    status: '',
    password: ''
  },
  addingUser: false,
  loading: false,
  error: null,
  validationSchema: null
};

export default UserForm;
