import { Button, Form } from 'antd';

interface IFormButtonProps {
  text: string;
}
export const FormButton = ({ text }: IFormButtonProps) => {
  return (
    <Form.Item
      wrapperCol={{
        xs: { span: 24, offset: 0 },
        sm: {
          span: 16,
          offset: 8,
        },
      }}
    >
      <Button type="primary" htmlType="submit">
        {text}
      </Button>
    </Form.Item>
  );
};
