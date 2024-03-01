import { Divider } from 'antd';
import authStore from '../../store/authStore/authStore';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button } from 'antd/es/radio';
import { EditableText } from './EditableText/EditableText';
import { IUser } from '../../types/types';
import styles from './Profile.module.css';

export const Profile = observer(() => {
  const [editableName, setEditableName] = useState(authStore.profile?.userName);
  const [editableSurname, setEditableSurname] = useState(authStore.profile?.surname);
  const [editableEmail, setEditableEmail] = useState(authStore.profile?.email);
  const [editablePhone, setEditablePhone] = useState(authStore.profile?.phone);
  const [editablePrefix, setEditablePrefix] = useState(authStore.profile?.prefix);
  const [editablePassword, setEditablePassword] = useState(authStore.profile?.password);

  const updateProfile = () => {
    authStore.updateProfile({
      userName: editableName,
      surname: editableSurname,
      email: editableEmail,
      prefix: editablePrefix,
      phone: editablePhone,
      password: editablePassword,
    });
  };

  const onChangeName = (value: string, field: keyof IUser) => {
    switch (field) {
      case 'userName':
        setEditableName(value);
        break;
      case 'surname':
        setEditableSurname(value);
        break;
      case 'email':
        setEditableEmail(value);
        break;
      case 'phone':
        setEditablePhone(value);
        break;
      case 'prefix':
        setEditablePrefix(value);
        break;
      case 'password':
        setEditablePassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <h2>Личный кабинет</h2>
      <Divider />
      <EditableText
        value={editableName}
        onChange={onChangeName}
        label="Имя:"
        field="userName"
      />
      <Divider />
      <EditableText
        value={editableSurname}
        onChange={onChangeName}
        label="Фамилия:"
        field="surname"
      />
      <Divider />
      <EditableText
        value={editableEmail}
        onChange={onChangeName}
        label="Email:"
        field="email"
      />
      <Divider />
      <div className={styles.phoneBlock}>
        <EditableText
          value={editablePrefix}
          onChange={onChangeName}
          label="Префикс:"
          field="prefix"
        />
        <EditableText
          value={editablePhone}
          onChange={onChangeName}
          label="Телефон:"
          field="phone"
        />
      </div>

      <Divider />
      <EditableText
        value={editablePassword}
        onChange={onChangeName}
        label="Пароль:"
        field="password"
      />
      <Divider />
      <Button type="primary" onClick={updateProfile}>
        Сохранить
      </Button>
    </div>
  );
});
