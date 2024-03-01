import { Radio, Space } from 'antd';
import styles from './CitiesBlock.module.css';
import { observer } from 'mobx-react-lite';

interface ICitiesBlockProps {
  onChange: (value: string) => void;
  title: string;
  value: string;
  items: string[];
}

export const CitiesBlock = observer(
  ({ title, onChange, items, value }: ICitiesBlockProps) => {
    return (
      <div className={styles.container}>
        <h3>{title}</h3>
        <Radio.Group onChange={(e) => onChange(e.target.value)} value={value}>
          <Space direction="vertical">
            {items.map((item) => (
              <Radio.Button key={item} value={item}>
                {item}
              </Radio.Button>
            ))}
          </Space>
        </Radio.Group>
      </div>
    );
  }
);
