import { NavLink } from 'react-router-dom';
import { Image } from 'antd';
import { observer } from 'mobx-react-lite';
import { FILTERS_NAME, ROUTE } from '../../constants/constants';
import hotelsStore from '../../store/hotelsStore/hotelsStore';
import styles from './CityCard.module.css';

interface ICityCardProps {
  city: string;
}

export const CityCard = observer(({ city }: ICityCardProps) => {
  return (
    <div className={styles.container}>
      <NavLink
        to={ROUTE.HOTELS}
        onClick={() => hotelsStore.addFilter(FILTERS_NAME.CITY, city)}
      >
        <Image
          src={`./cityImages/${city}.jpg`}
          alt="фото"
          className={styles.img}
          width={'100%'}
          height={265}
          preview={false}
        />
        <div className={styles.imgTitle}>
          <h2 className={styles.imgText}>{city}</h2>
        </div>
      </NavLink>
    </div>
  );
});
