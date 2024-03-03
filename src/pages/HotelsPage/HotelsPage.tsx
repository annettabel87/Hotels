import { Button, Flex, Spin } from 'antd';
import { CardsField } from '../../components/CardsField/CardsField';
import { SideBar } from '../../components/SideBar/SideBar';
import { useNavigate } from 'react-router-dom';
import hotelsStore from '../../store/hotelsStore/hotelsStore';
import { ROUTE } from '../../constants/constants';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import styles from './HotelsPage.module.css';

export const HotelsPage = observer(() => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!hotelsStore.filters.city) {
      navigate(ROUTE.MAIN);
    }
  }, []);

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <p>{hotelsStore.error}</p>
      {hotelsStore.loading ? (
        <Spin size="large" className={styles.spin} />
      ) : (
        <Flex justify="between" gap={16} className={styles.flex}>
          <div className={styles.sidebar}>
            <Button onClick={toggleIsOpen} className={styles.menuBtn}>
              <MenuOutlined />
              <span>Фильтры</span>
            </Button>
            <SideBar
              isOpen={isOpen}
              defaultValues={hotelsStore.sidebarPanelData}
              addFilter={hotelsStore.addFilter}
              filters={hotelsStore.filters}
            />
          </div>

          <CardsField />
        </Flex>
      )}
    </div>
  );
});
