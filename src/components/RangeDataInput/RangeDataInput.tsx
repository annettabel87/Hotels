import { DatePicker, Form } from 'antd';
import { observer } from 'mobx-react-lite';
import hotelsStore from '../../store/hotelsStore/hotelsStore';
import { valueProps } from '../../types/types';
const { RangePicker } = DatePicker;
import dayjs from 'dayjs';

interface IRangeDataInputProps {
  label?: string;
  rangeStyles?: React.CSSProperties;
  itemStyles?: React.CSSProperties;
}

export const RangeDataInput = observer(
  ({ label, rangeStyles, itemStyles }: IRangeDataInputProps) => {
    const onDataChange = (values: valueProps) => {
      if (values[0] && values[1]) {
        hotelsStore.setSearchStartDate(values[0].toString());
        hotelsStore.setSearchEndDate(values[1].toString());
      }
    };

    return (
      <Form.Item
        label={label}
        name="RangePicker"
        style={itemStyles}
        rules={[
          {
            required: true,
            message: 'Выберите даты!',
          },
        ]}
        initialValue={[
          dayjs(hotelsStore.searchData.startDate),
          dayjs(hotelsStore.searchData.endDate),
        ]}
      >
        <RangePicker
          style={rangeStyles}
          placeholder={['Дата заезда', 'Дата отъезда']}
          onChange={(e) => {
            if (e) {
              onDataChange(e);
            }
          }}
        />
      </Form.Item>
    );
  }
);
