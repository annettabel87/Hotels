import { Flex, Spin } from 'antd';
import { CardsField } from '../../components/CardsField/CardsField';
import { SideBar } from '../../components/SideBar/SideBar';
import { useNavigate } from 'react-router-dom';
import hotelsStore from '../../store/hotelsStore/hotelsStore';
import { ROUTE } from '../../constants/constants';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import styles from './HotelsPage.module.css';

export const HotelsPage = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!hotelsStore.filters.city) {
      navigate(ROUTE.MAIN);
    }
  }, []);

  return (
    <div className={styles.container}>
      <p>{hotelsStore.error}</p>
      {hotelsStore.loading ? (
        <Spin size="large" className={styles.spin} />
      ) : (
        <Flex justify="between" gap={16} className={styles.flex}>
          <SideBar
            defaultValues={hotelsStore.sidebarPanelData}
            addFilter={hotelsStore.addFilter}
            filters={hotelsStore.filters}
          />
          <CardsField />
        </Flex>
      )}
    </div>
  );
});
