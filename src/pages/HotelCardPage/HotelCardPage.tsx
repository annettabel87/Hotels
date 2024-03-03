import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import hotelsStore from '../../store/hotelsStore/hotelsStore';
import { StarFilled } from '@ant-design/icons';
import { Button, Col, Rate, Row, Spin, Tag } from 'antd';
import { ReviewCard } from '../../components/ReviewCard/ReviewCard';
import { useState } from 'react';
import { CarouselComponent } from '../../components/CarouselComponent/CarouselComponent';
import styles from './HotelCardPage.module.css';
import { BookingModal } from '../../components/BookingModal/BookingModal';

export const HotelCardPage = observer(() => {
  const { hotelId } = useParams();
  const [showAllReview, setShowAllReview] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const SHOW_HOTELS_LENGTH = 3;
  if (hotelId) {
    hotelsStore.findHotelById(+hotelId);
  }

  const toggleShowReview = () => {
    setShowAllReview((prev) => !prev);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {!hotelsStore.currentHotel ? (
        <div className={styles.spinContainer}>
          <Spin size="large" />
        </div>
      ) : (
        <div className={styles.container}>
          <Row
            wrap={true}
            gutter={[10, 10]}
            justify={{ xs: 'center', sm: 'space-between' }}
          >
            <Col flex={1}>
              <h2 className={styles.title}>{hotelsStore.currentHotel.title}</h2>
              <Rate
                disabled
                defaultValue={hotelsStore.currentHotel.stars}
                character={<StarFilled style={{ width: 12 }} />}
              />
              <p className={styles.subtitle}>
                {hotelsStore.currentHotel.address.street},
                {hotelsStore.currentHotel.address.city}
              </p>
            </Col>
            <Col flex={1} style={{ textAlign: 'right' }}>
              <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Забронировать
              </Button>
              <BookingModal
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
              />
            </Col>
          </Row>
          <Row justify="space-between">
            <Col lg={12} className={styles.flexColumn}>
              <CarouselComponent photo={hotelsStore.currentHotel.photo} />
              <div className={styles.description}>
                <h3 className={styles.titleDescription}>Описание отеля</h3>
                <p>{hotelsStore.currentHotel.description}</p>
              </div>
            </Col>
            <Col lg={11}>
              <div className={styles.flexColumn}>
                <div className={styles.header}>
                  <h3 className={styles.titleDescription}>Отзывы</h3>
                  <Tag className={styles.tag} color="#006ce4">
                    {hotelsStore.currentHotel.raring}
                  </Tag>
                </div>

                <div className={styles.flexColumn}>
                  {showAllReview
                    ? hotelsStore.currentHotel.reviews.map((item) => (
                        <ReviewCard key={item.id} {...item} />
                      ))
                    : hotelsStore.currentHotel.reviews
                        .slice(0, 3)
                        .map((item) => <ReviewCard key={item.id} {...item} />)}
                </div>
                {hotelsStore.currentHotel.reviews.length >= SHOW_HOTELS_LENGTH && (
                  <Button type="default" onClick={() => toggleShowReview()}>
                    {showAllReview ? 'Свернуть' : 'Все отзывы'}
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
});
