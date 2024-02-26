import { Flex } from 'antd';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.css';

export const LoginPage = () => {
  return (
    <Flex justify="center" align="center" className={styles.page}>
      <LoginForm />
    </Flex>
  );
};
