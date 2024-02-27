import { ReactNode, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Dropdown, Form, InputNumber, MenuProps } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import hotelsStore from '../../../store/hotelsStore/hotelsStore';
import styles from './DropdownComponent.module.css';

interface IInfoOpen {
  source: 'menu' | 'trigger';
}

interface IDropdownComponentProps {
  children: ReactNode;
}
export const DropdownComponent = observer(({ children }: IDropdownComponentProps) => {
  const [open, setOpen] = useState(false);

  const increment = () => {
    if (hotelsStore.searchData.guests !== 10) {
      hotelsStore.setSearchGuests(hotelsStore.searchData.guests + 1);
    }
  };
  const decrement = () => {
    if (hotelsStore.searchData.guests !== 1) {
      hotelsStore.setSearchGuests(hotelsStore.searchData.guests - 1);
    }
  };

  const handleOpenChange = (open: boolean, info: IInfoOpen) => {
    if (info.source === 'trigger' || open) {
      setOpen(open);
    }
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Form.Item label="Гостей" name="guests">
          <Button onClick={decrement} className={styles.btn}>
            <MinusOutlined className={styles.icon} />
          </Button>
          <InputNumber
            className={styles.inputNumber}
            min={1}
            max={10}
            onChange={(e) => {
              if (e) {
                hotelsStore.setSearchGuests(e);
              }
            }}
            value={hotelsStore.searchData.guests}
          />
          <Button onClick={increment} className={styles.btn}>
            <PlusOutlined className={styles.icon} />
          </Button>
        </Form.Item>
      ),
    },
    {
      key: '2',
      label: (
        <Button
          type="primary"
          onClick={() => setOpen(false)}
          className={styles.primaryBtn}
        >
          Готово
        </Button>
      ),
    },
  ];

  return (
    <Dropdown
      className={styles.dropdown}
      menu={{ items }}
      placement="bottomRight"
      onOpenChange={(open, info) => handleOpenChange(open, info)}
      open={open}
      trigger={['click']}
    >
      {children}
    </Dropdown>
  );
});
