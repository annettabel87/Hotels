import { Form, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import PrefixSelector from '../UI/PrefixSelector/PrefixSelector';

interface IPhoneInputProps {
  label?: string;
  required?: boolean;
  initialValue?: string;
  initialPrefixValue?: string;
  values: string[];
  inputStyle?: React.CSSProperties;
}

export const PhoneInput = observer(
  ({
    label,
    required,
    initialValue,
    values,
    initialPrefixValue,
    inputStyle,
  }: IPhoneInputProps) => {
    return (
      <Form.Item
        name="phone"
        label={label}
        rules={[
          {
            required,
            message: 'Введите номер телефона',
          },
        ]}
        initialValue={initialValue}
      >
        <Input
          addonBefore={
            <PrefixSelector values={values} initialValue={initialPrefixValue} />
          }
          style={inputStyle}
        />
      </Form.Item>
    );
  }
);
