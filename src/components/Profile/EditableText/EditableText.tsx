import Paragraph from 'antd/es/typography/Paragraph';
import { observer } from 'mobx-react-lite';
import { IUser } from '../../../types/types';
import styles from './EditableText.module.css';

interface IEditableTextProps {
  value: string | number | undefined;
  onChange: (value: string, field: keyof IUser) => void;
  label: string;
  field: keyof IUser;
}
export const EditableText = observer(
  ({ value, onChange, label, field }: IEditableTextProps) => {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>{label}</h3>
        <Paragraph
          className={styles.text}
          editable={{ onChange: (value) => onChange(value, field) }}
        >
          {value}
        </Paragraph>
      </div>
    );
  }
);
