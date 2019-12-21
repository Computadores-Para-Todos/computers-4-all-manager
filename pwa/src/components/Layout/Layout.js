import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Menu, Header, Icon, Dropdown, Divider, Responsive, Sidebar } from 'semantic-ui-react';

import styles from './styles';

const sideMenuItens = [
  { as: 'a', name: 'Início', icon: 'home', to: '' },
  { as: 'a', name: 'Atividades', icon: 'list', to: '' },
  { as: 'a', name: 'Doadores', icon: 'handshake', to: '' },
  { as: 'a', name: 'Dispositivos', icon: 'desktop', to: '' },
  { as: 'a', name: null, icon: null, to: '' },
  { as: 'a', name: 'Usuários', icon: 'users', to: '' }
];

const userMenuItens = [{ as: 'a', name: 'Perfil', to: '', icon: 'user' }];

/**
 * View da interface geral do sistema
 *
 * @returns {React} Página de layout renderizada
 */
function Layout({ activePage, selectPageCallback, logoutCallback, userName, render }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const toggleMenuVisibility = () => {
    setIsMenuVisible(oldValue => !oldValue);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.navbarContainer}>
        <Menu as="nav" style={styles.navbar}>
          <Menu.Item style={styles.title}>
            <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
              <Header as="h2" size="small" onClick={toggleMenuVisibility} inverted>
                <Icon name="sidebar" />
                <Header.Content>
                  Computadores
                  <br /> para todos
                </Header.Content>
              </Header>
            </Responsive>
            <Responsive minWidth={Responsive.onlyTablet.maxWidth + 1}>
              <Header as="h2" size="medium" inverted>
                <Header.Content>
                  Computadores
                  <br /> para todos
                </Header.Content>
              </Header>
            </Responsive>
          </Menu.Item>
          <Menu.Item style={styles.userDropdown} position="right">
            <Dropdown text={userName}>
              <Dropdown.Menu>
                {userMenuItens.map(item => (
                  <Dropdown.Item key={item.name} as={item.as}>
                    {item.icon && <Icon name={item.icon} />}
                    {item.name}
                  </Dropdown.Item>
                ))}
                <Divider fitted />
                <Dropdown.Item style={{ color: 'red' }} onClick={logoutCallback}>
                  <Icon name="log out" />
                  Sair
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu>
      </div>
      <Responsive style={{ flex: 1 }} maxWidth={Responsive.onlyTablet.maxWidth}>
        <Sidebar.Pushable as="div" style={{ width: '100%' }}>
          <Sidebar
            as={Menu}
            style={styles.leftMenu}
            width="thin"
            animation="overlay"
            onHide={() => setIsMenuVisible(false)}
            visible={isMenuVisible}
            inverted
            vertical
          >
            {sideMenuItens.map(item => (
              <Menu.Item
                key={item.name}
                as={item.as}
                name={item.name}
                active={activePage === item.name}
                onClick={(_, { name }) => selectPageCallback(name)}
                disabled={item.name === null}
              >
                {item.icon && <Icon style={styles.menuIcon} name={item.icon} />}
                {item.name}
              </Menu.Item>
            ))}
          </Sidebar>
          <Sidebar.Pusher as={Container} style={styles.content} fluid>
            {render()}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
      <Responsive style={styles.container} minWidth={Responsive.onlyTablet.maxWidth + 1}>
        <Menu inverted vertical style={styles.leftMenu}>
          {sideMenuItens.map(item => (
            <Menu.Item
              key={item.name}
              as={item.as}
              name={item.name}
              active={activePage === item.name}
              onClick={(_, { name }) => selectPageCallback(name)}
              disabled={item.name === null}
            >
              {item.icon && <Icon style={styles.menuIcon} name={item.icon} />}
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
        <Container style={styles.content} fluid>
          {render()}
        </Container>
      </Responsive>
    </div>
  );
}

Layout.propTypes = {
  /** Nome da página sendo exibida */
  activePage: PropTypes.string.isRequired,
  /** Callback chamada ao selecionar uma nova página */
  selectPageCallback: PropTypes.func.isRequired,
  /** Callback chamada ao clicar em sair */
  logoutCallback: PropTypes.func.isRequired,
  /** Nome do usuário a ser exibido no cando superior direito */
  userName: PropTypes.string.isRequired,
  /** Elemento que deve ser exibido no centro da aplicação */
  render: PropTypes.func.isRequired
};

export default Layout;
