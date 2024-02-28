import { Rate } from 'antd';
import styles from './StarsBlock.module.css';

interface IStarsBlockProps {
  onChange: (value: number) => void;
  title: string;
  value: number;
}

export const StarsBlock = ({ title, onChange, value }: IStarsBlockProps) => {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <Rate onChange={(e) => onChange(e)} value={value} />
    </div>
  );
};
