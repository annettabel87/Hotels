import { observer } from 'mobx-react-lite';
import { cityCardsData } from '../../constants/constants';
import { CityCard } from '../../components/CityCard/CityCard';
import hotelsStore from '../../store/hotelsStore/hotelsStore';
import styles from './MainPage.module.css';

export const MainPage = observer(() => {
  hotelsStore.sidebarPanelData;

  return (
    <div className={styles.container}>
      <h1>Найди лучшие отели</h1>
      <div className={styles.doubleBlock}>
        {cityCardsData.slice(0, 2).map((item) => (
          <CityCard key={item.id} city={item.city} />
        ))}
      </div>
      <div className={styles.tripleBlock}>
        {cityCardsData.slice(2).map((item) => (
          <CityCard key={item.id} city={item.city} />
        ))}
      </div>
    </div>
  );
});
