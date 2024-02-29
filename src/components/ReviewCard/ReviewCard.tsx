import { Button, Tag } from 'antd';
import { Ireview } from '../../types/types';
import styles from './ReviewCard.module.css';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';

export const ReviewCard = observer((props: Ireview) => {
  const { userName, rating, review } = props;
  const REVIEW_LENGTH = 150;
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Tag color="#006ce4">{rating}</Tag>
        <p className={styles.textBold}>{userName}</p>
      </div>
      <div className={styles.description}>
        {isOpen ? (
          <p>{review}</p>
        ) : (
          <div>
            <p>{review.slice(0, REVIEW_LENGTH)}</p>
          </div>
        )}
        {review.length >= REVIEW_LENGTH && (
          <Button
            type="text"
            style={{ background: 'none', color: '#003b95' }}
            onClick={() => toggleOpen()}
            className={styles.btn}
          >
            {isOpen ? 'свернуть' : 'подробнее'}
          </Button>
        )}
      </div>
    </div>
  );
});
