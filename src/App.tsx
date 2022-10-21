import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  NavLink,
} from '@mantine/core';
import {
  BrowserRouter,
  Route,
  Link,
  Routes,
  useLocation,
  Router,
} from 'react-router-dom';
import { listenerCount } from 'process';
import { Dasboard, Expenses, Revenues } from './pages';

function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  let listOfPages = [
    { route: '/dashboard', page: <Dasboard />, label: 'Dashboard' },
    { route: '/revenues', page: <Revenues />, label: 'Receitas' },
    { route: '/expenses', page: <Expenses />, label: 'Gastos' },
  ];

  return (
    <BrowserRouter>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <Navbar.Section>
              {listOfPages.map((chave) => {
                return (
                  <NavLink
                    label={chave.label}
                    component={Link}
                    to={chave.route}
                  />
                );
              })}
            </Navbar.Section>
          </Navbar>
        }
        footer={
          <Footer height={60} p="md">
            <Text align="center">Criado por Gustavo e Érik</Text>
          </Footer>
        }
        header={
          <Header height={70} p="md">
            <div
              style={{ display: 'flex', alignItems: 'center', height: '100%' }}
            >
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Text>Schedule Your Month</Text>
            </div>
          </Header>
        }
      >
        <Routes>
          {listOfPages.map((chave) => {
            return <Route path={chave.route} element={chave.page} />;
          })}
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
