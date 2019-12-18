import React, { useState } from 'react';
import { Container, Segment, Header, Form, Button, Message, Transition } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const View = props => {
  const [sucess, setSucess] = useState(false);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(false);
  const [visible, setVisibility] = useState(false);

  //função para realizar autenticação do usuário
  const auth = props => {
    if (attempt) {
      setError(false);
      setSucess(!sucess);
      //chamada da api aqui com retorno para a funcao de callback de sucess
      props.callbackOk();
    } else {
      setSucess(false);
      setError(!error);
      //chamada da api aqui com retorno para a funcao de callback de error
      props.callbackNotOk();
    }
    setVisibility(true);
    setAttempt(!attempt);
  };

  return (
    <Container style={styles.container}>
      <Segment style={styles.segment}>
        <Header style={styles.header}>PC4All - Manager</Header>
        <Form onSubmit={() => auth(props)}>
          <Form.Group widths="equal">
            <Form.Input type="email" fluid label="Email" placeholder="exemplo@exemplo.com" required />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input type="password" fluid label="Senha" placeholder="******" minLength="6" required />
          </Form.Group>
          <Form.Group style={styles.buttonsForm} widths="equal">
            <Button color={'blue'}>{`Criar Conta`}</Button>
            <Button color={'green'} animated={'fade'}>
              <Button.Content visible>Já tenho Conta</Button.Content>
              <Button.Content hidden>Entrar Agora</Button.Content>
            </Button>
          </Form.Group>
        </Form>
      </Segment>
      {error ? (
        <Transition transitionOnMount visible={visible} animation={'fly down'}>
          <Message
            style={styles.message}
            negative
            onDismiss={() => setVisibility(false)}
            header="Ocorreu um erro!"
            content="Os dados estão incorretos!"
          />
        </Transition>
      ) : null}
      {sucess ? (
        <Transition transitionOnMount visible={visible} animation={'fly down'}>
          <Message
            style={styles.message}
            positive
            onDismiss={() => setVisibility(false)}
            header="Bem vindo!"
            content="Você será redirecionado para o dashboard em instantes..."
          />
        </Transition>
      ) : null}
    </Container>
  );
};

View.propTypes = {
  callbackOk: PropTypes.func,
  callbackNotOk: PropTypes.func
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
