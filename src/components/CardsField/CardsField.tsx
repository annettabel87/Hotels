import { observer } from 'mobx-react-lite';
import { HotelCard } from './HotelCard/HotelCard';
import hotelsStore from '../../store/hotelsStore/hotelsStore';
import styles from './CardsField.module.css';

export const CardsField = observer(() => {
  return (
    <div className={styles.container}>
      {hotelsStore.hotels.length ? (
        hotelsStore.hotels.map((item) => <HotelCard key={item.id} {...item} />)
      ) : (
        <p>Нет подходящих отелей</p>
      )}
    </div>
  );
});
