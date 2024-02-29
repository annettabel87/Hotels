import { Alert } from 'antd';
import { BookingStatusType } from '../../../types/types';
import { observer } from 'mobx-react-lite';

interface IResultBlockProps {
  status: BookingStatusType;
}
export const ResultBlock = observer(({ status }: IResultBlockProps) => {
  return (
    <div>
      {status === 'booking' && <Alert message="Забронировано" type="info" />}
      {status === 'reject' && (
        <Alert message="Отклонено. Попробуйте еще раз" type="error" />
      )}
    </div>
  );
});
