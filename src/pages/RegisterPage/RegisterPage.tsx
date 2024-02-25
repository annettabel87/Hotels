import { Flex } from 'antd';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import styles from './RegisterPage.module.css';

export const RegisterPage = () => {
  return (
    <Flex justify="center" align="center" className={styles.page}>
      <RegisterForm />
    </Flex>
  );
};
