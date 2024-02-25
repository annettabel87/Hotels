import { Button, Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

interface IResultView {
  callback: () => void;
  text: string;
  btnText: string;
}
export const ResultView = ({ callback, text, btnText }: IResultView) => {
  return (
    <Result
      icon={<SmileOutlined />}
      title={text}
      extra={
        <Button type="primary" onClick={() => callback()}>
          {btnText}
        </Button>
      }
    />
  );
};
