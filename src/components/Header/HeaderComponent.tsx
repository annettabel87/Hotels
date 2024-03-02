import { NavLink, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Layout, Button, Flex, Dropdown, MenuProps } from 'antd';
import { UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { ROUTE } from '../../constants/constants';
import icon from '/logo.svg';
import authStore from '../../store/authStore/authStore';
const { Header } = Layout;
import { BurgerMenu } from './BurgerMenu/BurgerMenu';
import styles from './HeaderComponent.module.css';

export const HeaderComponent = observer(() => {
  const location = useLocation();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <NavLink to={ROUTE.PROFILE}>Личный кабинет</NavLink>,
      icon: <UserOutlined />,
    },
    {
      key: '2',
      label: (
        <div
          onClick={() => {
            authStore.logout();
          }}
        >
          Выйти
        </div>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  const itemsNoAuth: MenuProps['items'] = [
    {
      key: '1',
      label: <NavLink to={ROUTE.REGISTER}>Зарегистрироваться</NavLink>,
      icon: <LoginOutlined />,
    },
    {
      key: '2',
      label: <NavLink to={ROUTE.LOGIN}>Войти</NavLink>,
      icon: <LoginOutlined />,
    },
  ];

  return (
    <Header className={styles.header} title="Booking">
      <Flex justify="space-between" align="center" className={styles.container}>
        <NavLink to={ROUTE.MAIN} className={styles.logo}>
          <img src={icon} width={50} />
        </NavLink>
        <Flex gap={'small'} className={styles.btnBlock}>
          {!authStore.isAuth ? (
            <>
              {location.pathname !== ROUTE.REGISTER && (
                <Button key="1" className={styles.btn}>
                  <NavLink to={ROUTE.REGISTER}>Зарегистрироваться</NavLink>
                </Button>
              )}
              {location.pathname !== ROUTE.LOGIN && (
                <Button key="2" className={styles.btn}>
                  {' '}
                  <NavLink to={ROUTE.LOGIN}>Войти</NavLink>
                </Button>
              )}
            </>
          ) : (
            <Dropdown menu={{ items }} placement="bottomRight">
              <Button>{authStore.profile?.userName}</Button>
            </Dropdown>
          )}
        </Flex>
        <BurgerMenu items={authStore.isAuth ? items : itemsNoAuth} />
      </Flex>
    </Header>
  );
});
