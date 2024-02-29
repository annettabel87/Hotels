import { Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { BookingForm } from '../BookingForm/BookingForm';

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
      >
        <BookingForm handleCancel={handleCancel} />
      </Modal>
    );
  }
);
