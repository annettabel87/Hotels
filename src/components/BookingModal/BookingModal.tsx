import { Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { BookingForm } from '../BookingForm/BookingForm';
import styles from './BookingModal.module.css';

interface IBookingModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

export const BookingModal = observer(
  ({ isModalOpen, handleOk, handleCancel }: IBookingModalProps) => {
    return (
      <Modal
        title={'Бронирование'}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={[]}
        style={{
          paddingLeft: 15,
          paddingRight: 15,
        }}
        className={styles.modal}
        width={''}
      >
        <BookingForm handleCancel={handleCancel} />
      </Modal>
    );
  }
);
