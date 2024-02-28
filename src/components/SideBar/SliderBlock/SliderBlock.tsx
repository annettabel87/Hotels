import { Slider } from 'antd';
import styles from './SliderBlock.module.css';

interface ISliderBlockProps {
  min: number;
  max: number;
  onChangeComplete: (value: number[]) => void;
  title: string;
}

export const SliderBlock = ({ min, max, onChangeComplete, title }: ISliderBlockProps) => {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <div className={styles.sliderBlock}>
        <span>{min} р</span>
        <Slider
          className={styles.slider}
          range
          step={1}
          min={min}
          max={max}
          defaultValue={[min, max]}
          onChangeComplete={(v) => onChangeComplete(v)}
        />
        <span>{max} р</span>
      </div>
    </div>
  );
};
