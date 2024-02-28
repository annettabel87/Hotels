import { observer } from 'mobx-react-lite';
import hotelsStore from '../../store/hotelsStore/hotelsStore';
import styles from './CardsField.module.css';

export const CardsField = observer(() => {
  return (
    <div className={styles.container}>
      {hotelsStore.hotels.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>{item.address.city}</p>
          <p>{item.stars}</p>
          <p>{item.raring}</p>
          <img src={item.img} width={100} />
        </div>
      ))}
    </div>
  );
});
