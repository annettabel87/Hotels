import { Card, Tag } from 'antd';
import { IReservation } from '../../../types/types';
import { observer } from 'mobx-react-lite';
import { dateFormate } from '../../../helpers/dateFormate';
import styles from './BookingCard.module.css';

export const BookingCard = observer((props: IReservation) => {
  const { hotelInfo, startDate, endDate, guests, price, transfer, description } = props;

  return (
    <Card
      title={
        <div className={styles.row}>
          <h3>Отель: </h3>
          <p>{hotelInfo.title}</p>
        </div>
      }
      bordered={false}
      style={{ width: '100%' }}
    >
      <div className={styles.row}>
        <h3>Даты: </h3>
        <p>
          {dateFormate.dateFromString(startDate)} - {dateFormate.dateFromString(endDate)}
        </p>
      </div>
      <div className={styles.row}>
        <h3>Количество гостей: </h3>
        <p>{guests}</p>
      </div>
      <div className={styles.row}>
        <h3>Цена за ночь: </h3>
        <p>{price}</p>
      </div>
      <div className={styles.row}>
        <h3>Итоговая цена: </h3>
        <p>{price * dateFormate.getCountDays(startDate, endDate)}</p>
      </div>
      <div className={styles.row}>
        <h3>Трансфер: </h3>
        <p>
          {transfer ? (
            <Tag color="blue">Добавлен</Tag>
          ) : (
            <Tag color="magenta">Не нужен</Tag>
          )}
        </p>
      </div>
      <div className={styles.row}>
        <h3>Дополнительно: </h3>
        <p>{description}</p>
      </div>
    </Card>
  );
});
