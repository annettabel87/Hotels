import { ReactNode, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Dropdown, MenuProps } from 'antd';
import { GuestInput } from '../../GuestsInput/GuestInput';
import styles from './DropdownComponent.module.css';

interface IInfoOpen {
  source: 'menu' | 'trigger';
}

interface IDropdownComponentProps {
  children: ReactNode;
}
export const DropdownComponent = observer(({ children }: IDropdownComponentProps) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean, info: IInfoOpen) => {
    if (info.source === 'trigger' || open) {
      setOpen(open);
    }
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <GuestInput />,
    },
    {
      key: '2',
      label: (
        <Button
          type="primary"
          onClick={() => setOpen(false)}
          className={styles.primaryBtn}
        >
          Готово
        </Button>
      ),
    },
  ];

  return (
    <Dropdown
      className={styles.dropdown}
      menu={{ items }}
      placement="bottomRight"
      onOpenChange={(open, info) => handleOpenChange(open, info)}
      open={open}
      trigger={['click']}
    >
      {children}
    </Dropdown>
  );
});
