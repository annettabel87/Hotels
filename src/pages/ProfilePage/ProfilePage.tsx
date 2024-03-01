import { observer } from 'mobx-react-lite';
import authStore from '../../store/authStore/authStore';
import { Navigate } from 'react-router-dom';
import { ROUTE } from '../../constants/constants';
import { Profile } from '../../components/Profile/Profile';
import styles from './ProfilePage.module.css';
import { BookingList } from '../../components/BookingList/BookingList';

export const ProfilePage = observer(() => {
  return (
    <div className={styles.page}>
      {authStore.isAuth ? (
        <div className={styles.container}>
          <Profile />
          <BookingList />
        </div>
      ) : (
        <Navigate to={ROUTE.LOGIN} />
      )}
    </div>
  );
});
