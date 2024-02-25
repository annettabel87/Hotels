import { Form, Select } from 'antd';
const { Option } = Select;

interface IPrefixSelectorProps {
  values: string[];
}
const PrefixSelector = ({ values }: IPrefixSelectorProps) => {
  return (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        {values.map((value) => (
          <Option key={value} value={value}>
            +{value}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default PrefixSelector;
