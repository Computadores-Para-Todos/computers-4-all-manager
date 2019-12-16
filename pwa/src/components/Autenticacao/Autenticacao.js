import React from 'react';
import { Container, Segment, Header, Form, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
const view = props => (
  <Container style={styles.container}>
    <Segment style={styles.segment}>
      <Header style={styles.header}>PC4All - Manager</Header>
      <Form>
        <Form.Group widths="equal">
          <Form.Input type="email" fluid label="Email" placeholder="exemplo@exemplo.com" required />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input type="password" fluid label="Senha" placeholder="******" minLength="6" required />
        </Form.Group>
        <Form.Group style={styles.areaBotoes} widths="equal">
          <Button onClick={() => console.log(props)}>{`Criar Conta`}</Button>
          <Button onClick={() => console.log(props)}>{`Entrar Agora`}</Button>
        </Form.Group>
      </Form>
    </Segment>
    {props.erro ? (
      <Message
        style={styles.message}
        negative
        onDismiss={() => alert('não pode ser fechado')}
        header="Ocorreu um erro!"
        content="Os dados estão incorretos!"
      />
    ) : null}
    {props.sucesso ? (
      <Message
        style={styles.message}
        positive
        onDismiss={() => alert('não pode ser fechado')}
        header="Bem vindo!"
        content="Você será redirecionado para o dashboard em instantes..."
      />
    ) : null}
  </Container>
);

view.propTypes = {
  erro: PropTypes.bool,
  sucesso: PropTypes.bool
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  segment: {
    marginTop: '5%',
    display: 'flex',
    flexDirection: 'column',
    width: '80%'
  },
  header: {
    textAlign: 'center',
    marginBottom: '5%'
  },
  areaBotoes: {
    marginTop: '5%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    position: 'absolute',
    top: '70%'
  }
};

export default view;
