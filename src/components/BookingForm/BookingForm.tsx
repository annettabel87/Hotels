import { Input, Checkbox, Button, Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import authStore from '../../store/authStore/authStore';
import hotelsStore from '../../store/hotelsStore/hotelsStore';
import { IBookingData } from '../../types/types';
import { observer } from 'mobx-react-lite';
import { RangeDataInput } from '../RangeDataInput/RangeDataInput';
import { ResultBlock } from './ResultBlock/ResultBlock';
import { PhoneInput } from '../PhoneInput/PhoneInput';
import { PREFIXES } from '../../constants/constants';
import { GuestInput } from '../GuestsInput/GuestInput';
import { useEffect } from 'react';
import styles from './BookingForm.module.css';

interface IBookingFormProps {
  handleCancel: () => void;
}

export const BookingForm = observer(({ handleCancel }: IBookingFormProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    authStore.setBookingStatus(null);
  }, []);

  const onSubmit = (values: IBookingData) => {
    if (hotelsStore.currentHotel && authStore.profile) {
      const reservation = {
        hotelInfo: {
          id: hotelsStore.currentHotel.id,
          title: hotelsStore.currentHotel.title,
        },
        startDate: hotelsStore.searchData.startDate as string,
        endDate: hotelsStore.searchData.endDate as string,
        guests: hotelsStore.searchData.guests,
        timestamp: Date.now(),
        userId: authStore.profile.id,
        price: hotelsStore.currentHotel.price,
        id: Date.now(),
        transfer: values.transfer,
        description: values.description,
      };
      authStore.booking(reservation);
    }
  };

  if (authStore.bookingStatus === 'booking') {
    form.resetFields();
  }

  return (
    <Form name="booking" className={styles.form} onFinish={onSubmit} form={form}>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'Не валидный email!',
          },
          {
            required: true,
            message: 'Введите email!',
          },
        ]}
        initialValue={authStore.profile?.email}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="name"
        label="Имя"
        rules={[
          {
            required: true,
            message: 'Введите ваше имя',
            whitespace: true,
          },
        ]}
        initialValue={authStore.profile?.userName}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="surname"
        label="Фамилия"
        rules={[
          {
            required: true,
            message: 'Введите вашу фамилию',
            whitespace: true,
          },
        ]}
        initialValue={authStore.profile?.surname}
      >
        <Input />
      </Form.Item>
      <PhoneInput
        label="Телефон"
        required
        initialValue={authStore.profile?.phone}
        values={PREFIXES}
        initialPrefixValue={authStore.profile?.prefix}
        inputStyle={{ width: '100%' }}
      />
      <RangeDataInput label="Даты" rangeStyles={{ width: '100%' }} />
      <GuestInput />
      <Form.Item name="transfer" valuePropName="checked">
        <Checkbox>
          <span>Мне бы хотелось запросить трансфер</span>
        </Checkbox>
      </Form.Item>
      <Form.Item name="description">
        <TextArea rows={4} />
      </Form.Item>
      <div className={styles.btnWrapper}>
        <Form.Item>
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            loading={authStore.bookingStatus === 'pending'}
            disabled={authStore.profile === null}
          >
            Забронировать
          </Button>
        </Form.Item>
        <Form.Item>
          <Button key="back" onClick={handleCancel}>
            Отмена
          </Button>
        </Form.Item>
      </div>
      <ResultBlock status={authStore.bookingStatus} />
      {authStore.profile === null && (
        <p className={styles.mainText}>Авторизуйтесь для бронирования</p>
      )}
      <p className={styles.error}>{authStore.bookingError}</p>
    </Form>
  );
});
