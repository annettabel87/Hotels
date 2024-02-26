import { Form, Input, Spin } from 'antd';
import { ILoginData } from '../../types/types';
import { observer } from 'mobx-react-lite';
import { FormButton } from '../UI/FormButton/FormButton';
import { useNavigate } from 'react-router-dom';
import { ROUTE, layoutForm } from '../../constants/constants';
import { ResultView } from '../UI/ResultView/ResultView';
import authStore from '../../store/authStore/authStore';
import styles from './LoginForm.module.css';

export const LoginForm = observer(() => {
  const navigate = useNavigate();

  const onSubmit = (values: ILoginData) => {
    authStore.login(values.email, values.password);
  };

  return (
    <>
      {authStore.isLoading ? (
        <Spin size="large" />
      ) : (
        !authStore.profile && (
          <Form
            {...layoutForm}
            name="register"
            onFinish={onSubmit}
            className={styles.form}
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'Не валидный email!',
                },
                {
                  required: true,
                  message: 'Введите email!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Пароль"
              rules={[
                {
                  required: true,
                  message: 'Введите пароль!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <FormButton text={'Войти'} />
          </Form>
        )
      )}
      {authStore.profile && !authStore.error && (
        <ResultView
          text={'Вы вошли.'}
          btnText={'На главную'}
          callback={() => {
            navigate(ROUTE.MAIN);
          }}
        />
      )}
      <p className={styles.error}>{authStore.error}</p>
    </>
  );
});
