import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../constants/constants';
import { Button, Result } from 'antd';
import styles from './NotFoundPage.module.css';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <Result
        title="Такой страницы не существует."
        extra={
          <Button type="primary" onClick={() => navigate(ROUTE.MAIN)}>
            на главную
          </Button>
        }
      />
    </div>
  );
};
