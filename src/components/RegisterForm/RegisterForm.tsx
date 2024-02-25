import { Form, Input, Spin } from 'antd';
import { IUser } from '../../types/types';
import { observer } from 'mobx-react-lite';
import usersStore from '../../store/usersStore/usersStore';
import { FormButton } from '../UI/FormButton/FormButton';
import PrefixSelector from '../UI/PrefixSelector/PrefixSelector';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../constants/constants';
import { ResultView } from '../UI/ResultView/ResultView';
import styles from './RegisterForm.module.css';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export const RegisterForm = observer(() => {
  const navigate = useNavigate();

  const onSubmit = (values: Omit<IUser, 'id' | 'isAuth'>) => {
    usersStore.addUser({
      userName: values.userName,
      email: values.email,
      password: values.password,
      prefix: values.prefix,
      phone: values.phone,
    });
  };

  return (
    <>
      {usersStore.isLoading ? (
        <Spin size="large" />
      ) : (
        !usersStore.isCompleted && (
          <Form {...layout} name="register" onFinish={onSubmit} className={styles.form}>
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
            <Form.Item
              name="userName"
              label="Имя"
              rules={[
                {
                  required: true,
                  message: 'Введите ваше имя',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Телефон"
              rules={[
                {
                  required: true,
                  message: 'Введите номер телефона',
                },
              ]}
            >
              <Input
                addonBefore={<PrefixSelector values={['375', '7']} />}
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
            <FormButton text={'Зарегистрироваться'} />
          </Form>
        )
      )}
      {usersStore.isCompleted && !usersStore.error && (
        <ResultView
          text={'Вы зарегистрированы'}
          btnText={'На главную'}
          callback={() => {
            usersStore.setIsCompleted(false);
            navigate(ROUTE.MAIN);
          }}
        />
      )}
      <p className={styles.error}>{usersStore.error}</p>
    </>
  );
});
