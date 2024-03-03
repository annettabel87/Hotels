import { observer } from 'mobx-react-lite';
import authStore from '../../store/authStore/authStore';
import { BookingCard } from './BookingCard/BookingCard';
import styles from './BookingList.module.css';

export const BookingList = observer(() => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Мои бронирования</h2>
      <div className={styles.cardField}>
        {!authStore.profile?.history.length ? (
          <p className={styles.centre}>Нет забронированных отелей</p>
        ) : (
          authStore.profile?.history.map((item) => (
            <BookingCard key={item.id} {...item} />
          ))
        )}
      </div>
    </div>
  );
});
