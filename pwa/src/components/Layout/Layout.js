import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import { Container, Menu, Header, Icon, Dropdown, Divider, Responsive, Sidebar } from 'semantic-ui-react';

import styles from './styles';

/**
 * View da interface geral do sistema
 *
 * @returns {React} Página de layout renderizada
 */
function Layout({ logoutCallback, userName, sideMenuItens, userMenuItens }) {
  const location = useLocation();
  const routesList = useMemo(() => userMenuItens.concat(...sideMenuItens), [sideMenuItens, userMenuItens]);
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
                  <Dropdown.Item key={item.name} as={Link} to={item.path}>
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
                as={Link}
                to={item.path}
                name={item.name}
                active={location.pathname === `/${item.name}`}
                disabled={item.name === null}
                onClick={() => setIsMenuVisible(false)}
              >
                {item.icon && <Icon style={styles.menuIcon} name={item.icon} />}
                {item.name}
              </Menu.Item>
            ))}
          </Sidebar>
          <Sidebar.Pusher as={Container} style={styles.content} fluid>
            <Switch>
              {routesList.map(item => (
                <Route key={item.path} path={`/${item.path}`} exact={item.exact || false} component={item.component} />
              ))}
            </Switch>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
      <Responsive style={styles.container} minWidth={Responsive.onlyTablet.maxWidth + 1}>
        <Menu inverted vertical style={styles.leftMenu}>
          {sideMenuItens.map(item => (
            <Menu.Item
              as={Link}
              to={item.path}
              key={item.name}
              name={item.name}
              active={location.pathname === `/${item.name}`}
              disabled={item.name === null}
              onClick={() => setIsMenuVisible(false)}
            >
              {item.icon && <Icon style={styles.menuIcon} name={item.icon} />}
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
        <Container style={styles.content} fluid>
          <Switch>
            {routesList.map(item => (
              <Route key={item.path} path={`/${item.path}`} exact component={item.component} />
            ))}
          </Switch>
        </Container>
      </Responsive>
    </div>
  );
}

const menuItem = PropTypes.shape({
  /** Nome da que aparecerá no menu lateral */
  name: PropTypes.string,
  /** Icone exibido junto ao nome */
  icon: PropTypes.string,
  /** Rota na qual o a pagina será exibida */
  path: PropTypes.string.isRequired,
  /** Rota deve ser exata */
  exact: PropTypes.bool,
  /** Componente a ser renderizado */
  component: PropTypes.elementType
});

Layout.propTypes = {
  /** Callback chamada ao clicar em sair */
  logoutCallback: PropTypes.func.isRequired,
  /** Nome do usuário a ser exibido no cando superior direito */
  userName: PropTypes.string.isRequired,
  /** Lista de itens que aparecerá no menu esquerdo e seus respectivos componentes*/
  sideMenuItens: PropTypes.arrayOf(menuItem).isRequired,
  /** Lista de item que aparecerá no dropdown do usuário */
  userMenuItens: PropTypes.arrayOf(menuItem).isRequired
};

export default Layout;
