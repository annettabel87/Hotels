import { Carousel, Image } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from './CarouselComponent.module.css';
import { observer } from 'mobx-react-lite';
import { IHotelPhotoType } from '../../types/types';

interface ICarouselComponentProps {
  photo: IHotelPhotoType[];
}

export const CarouselComponent = observer(({ photo }: ICarouselComponentProps) => {
  return (
    <Carousel
      dots={false}
      arrows={true}
      rootClassName={styles.carouselRoot}
      prevArrow={
        <div>
          <LeftOutlined
            width={30}
            height={30}
            style={{
              fontSize: '30px',
              color: 'black',
            }}
          />
        </div>
      }
      nextArrow={
        <div>
          <RightOutlined
            width={30}
            height={30}
            style={{
              fontSize: '30px',
              color: 'black',
            }}
          />
        </div>
      }
      className={styles.carousel}
    >
      {photo.map((item) => (
        <div key={item.id} className={styles.imgContainer}>
          <Image
            src={item.url}
            alt="photo"
            className={styles.carouselImg}
            height={'100%'}
            width={'100%'}
          />
        </div>
      ))}
    </Carousel>
  );
});
