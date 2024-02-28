import { Radio, Space } from 'antd';
import { IReviewMenuItem } from '../../../types/types';
import styles from './RateBlock.module.css';

interface IRateBlockProps {
  onChange: (value: number) => void;
  title: string;
  value: number;
  items: IReviewMenuItem[];
}

export const RateBlock = ({ title, onChange, items, value }: IRateBlockProps) => {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <Radio.Group onChange={(e) => onChange(e.target.value)} value={value}>
        <Space direction="vertical">
          {items.map((item) => (
            <Radio key={item.value} value={item.value}>
              {item.label}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  );
};
