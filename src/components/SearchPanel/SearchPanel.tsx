import { useState } from 'react';
import { AutoComplete, Button, DatePicker, Form, Input } from 'antd';
const { RangePicker } = DatePicker;
import hotelsStore from '../../store/hotelsStore/hotelsStore';
import { observer } from 'mobx-react-lite';
import { DropdownComponent } from './DropdownComponent/DropdownComponent';
import { getCitiesFromData } from '../../helpers/getCitiesFromData';
import { valueProps } from '../../types/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { FILTERS_NAME, ROUTE } from '../../constants/constants';
import styles from './SearchPanel.module.css';

export const SearchPanel = observer(() => {
  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const onAutoCompleteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        getCitiesFromData(hotelsStore.sidebarPanelData.cities, value)
      );
    }
  };

  const onCityChange = (value: string) => {
    console.log(value);
    hotelsStore.addFilter(FILTERS_NAME.CITY, value);
  };

  const cityOptions = autoCompleteResult.map((city) => ({
    label: city,
    value: city,
  }));

  const onDataChange = (values: valueProps) => {
    if (values[0] && values[1]) {
      hotelsStore.setSearchStartDate(values[0].toString());
      hotelsStore.setSearchEndDate(values[1].toString());
    }
  };

  const onSubmit = () => {
    navigate(ROUTE.HOTELS);
  };

  return (
    <>
      {(location.pathname == ROUTE.MAIN || location.pathname == ROUTE.HOTELS) && (
        <div className={styles.searchBlock}>
          <Form className={styles.form} onFinish={onSubmit} name="searchData">
            <Form.Item
              className={styles.item}
              name="city"
              rules={[{ required: true }]}
              help={<p className={styles.error}>Введите город</p>}
            >
              <AutoComplete
                options={cityOptions}
                onChange={onAutoCompleteChange}
                onSelect={(e) => onCityChange(e)}
                placeholder="Куда хотите поехать?"
              >
                <Input
                  size="large"
                  className={styles.heightBlock}
                  onChange={(e) => onCityChange(e.target.value)}
                />
              </AutoComplete>
            </Form.Item>
            <Form.Item name="RangePicker" className={styles.item}>
              <RangePicker
                style={{ width: '100%' }}
                placeholder={['Дата заезда', 'Дата отъезда']}
                onChange={(e) => {
                  if (e) {
                    onDataChange(e);
                  }
                }}
                className={styles.heightBlock}
              />
            </Form.Item>
            <Form.Item className={styles.item}>
              <DropdownComponent>
                <Button className={styles.heightBlock}>
                  Гостей: {hotelsStore.searchData.guests}
                </Button>
              </DropdownComponent>
            </Form.Item>
            <Form.Item className={styles.itemBtn}>
              <Button
                type={'primary'}
                htmlType="submit"
                style={{ width: '100%' }}
                className={styles.heightBlock}
              >
                Найти
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
});
