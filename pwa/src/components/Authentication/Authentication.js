import React from 'react';
import { Container, Segment, Header, Form, Button, Message, Transition } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import useForm from '../../hooks/useForm';

/**
 * View do formulário de autenticação do sistema
 *
 * @returns {React} Pagina de autenticação renderizada
 */
function View({ onSubmit, schema, errorMessage }) {
  const [setValue, handleSubmit, values, errors] = useForm(onSubmit, schema);

  const handleChange = (_, { name, value }) => {
    setValue(name, value);
  };

  return (
    <Container style={styles.container}>
      <Segment style={styles.segment}>
        <Header style={styles.header}>PC4All - Manager</Header>
        <Form noValidate={true} onSubmit={handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              id="email"
              name="email"
              type="email"
              fluid
              label="Email"
              placeholder="exemplo@exemplo.com"
              value={values.email || ''}
              onChange={handleChange}
              error={
                errors.email
                  ? {
                      content: errors.email,
                      pointing: 'above'
                    }
                  : null
              }
              required
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              id="password"
              name="password"
              type="password"
              fluid
              label="Senha"
              placeholder="******"
              minLength="6"
              value={values.password || ''}
              onChange={handleChange}
              error={
                errors.password
                  ? {
                      content: errors.password,
                      pointing: 'above'
                    }
                  : null
              }
              required
            />
          </Form.Group>
          <Form.Group style={styles.buttonsForm} widths="equal">
            <Button color={'blue'} onClick={() => setValue('submit', 'signup')}>
              Criar Conta
            </Button>
            <Button color={'green'} animated={'fade'} onClick={() => setValue('submit', 'login')}>
              <Button.Content visible>Já tenho Conta</Button.Content>
              <Button.Content hidden>Entrar Agora</Button.Content>
            </Button>
          </Form.Group>
        </Form>
      </Segment>
      {errorMessage ? (
        <Transition transitionOnMount animation={'fly down'}>
          <Message style={styles.message} negative header="Ocorreu um erro!" content={errorMessage} />
        </Transition>
      ) : null}
    </Container>
  );
}

View.propTypes = {
  /** Callback chamada ao submeter o formulário */
  onSubmit: PropTypes.func.isRequired,
  /** Scehma usado para a validação dos campos */
  schema: PropTypes.object.isRequired,
  /** Menagem de erro a ser exibida */
  errorMessage: PropTypes.string
};

View.defaultProps = {
  errorMessage: null
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  segment: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%'
  },
  header: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '10%',
    marginTop: '5%'
  },
  buttonsForm: {
    marginTop: '5%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    position: 'absolute',
    top: '3%'
  }
};

export default View;
