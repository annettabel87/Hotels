import { NavLink } from 'react-router-dom';
import { IHotel } from '../../../types/types';
import { ROUTE } from '../../../constants/constants';
import { Badge, Button, Col, Rate, Row } from 'antd';
import { StarFilled } from '@ant-design/icons';
import styles from './HotelCard.module.css';

export const HotelCard = (props: IHotel) => {
  const { id, title, address, img, stars, raring, price, reviews } = props;
  return (
    <div className={styles.card}>
      <div className={styles.imgWrapper}>
        <img src={img} alt="photo" className={styles.img} width={200} />
      </div>

      <div className={styles.description}>
        <Badge.Ribbon text={raring} style={{ top: 0 }}>
          <Row>
            <Col span={20}>
              <h2 className={styles.title}>{title}</h2>
              <Rate
                disabled
                defaultValue={stars}
                character={<StarFilled style={{ width: 12 }} />}
              />
              <p className={styles.subtitle}>{address.street}</p>
            </Col>
            <Col span={4}>Отзывы: {reviews.length}</Col>
          </Row>
        </Badge.Ribbon>
        <Row>
          <Col span={16}></Col>
          <Col span={8} className={styles.right}>
            <p>Цена за номер для 2 человек:</p>
            <p className={styles.mainText}>{price} руб.</p>
          </Col>
        </Row>
        <Row justify="space-between">
          <Col span={12}></Col>
          <Col span={12} className={styles.right}>
            <NavLink to={`${ROUTE.HOTELS}/${id}`}>
              <Button type="primary">Подробнее</Button>
            </NavLink>
          </Col>
        </Row>
      </div>
    </div>
  );
};
