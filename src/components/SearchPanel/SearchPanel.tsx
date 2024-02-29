import { useState } from 'react';
import { AutoComplete, Button, Form, Input } from 'antd';
import hotelsStore from '../../store/hotelsStore/hotelsStore';
import { observer } from 'mobx-react-lite';
import { DropdownComponent } from './DropdownComponent/DropdownComponent';
import { getCitiesFromData } from '../../helpers/getCitiesFromData';
import { useLocation, useNavigate } from 'react-router-dom';
import { FILTERS_NAME, ROUTE } from '../../constants/constants';
import { RangeDataInput } from '../RangeDataInput/RangeDataInput';
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
    hotelsStore.addFilter(FILTERS_NAME.CITY, value);
  };

  const cityOptions = autoCompleteResult.map((city) => ({
    label: city,
    value: city,
  }));

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
            <RangeDataInput
              rangeStyles={{ width: '100%', height: 50 }}
              itemStyles={{ flex: '3 1 auto', marginBottom: 0 }}
            />
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
