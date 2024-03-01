import { Button, Form, InputNumber } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import hotelsStore from '../../store/hotelsStore/hotelsStore';
import styles from './GuestInput.module.css';

export const GuestInput = observer(() => {
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

  return (
    <Form.Item label="Гостей" name="guests" initialValue={hotelsStore.searchData.guests}>
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
  );
});
