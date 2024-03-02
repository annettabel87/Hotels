import { Button, Dropdown } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import styles from './BurgerMenu.module.css';

interface IBurgerMenuProps {
  items: ItemType[];
}
export const BurgerMenu = observer(({ items }: IBurgerMenuProps) => {
  return (
    <Dropdown menu={{ items }} placement="bottomRight" className={styles.menu}>
      <Button>
        <MenuOutlined />
      </Button>
    </Dropdown>
  );
});
