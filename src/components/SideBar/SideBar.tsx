import { observer } from 'mobx-react-lite';
import { FILTERS_NAME, REVIEW_MENU_ITEM } from '../../constants/constants';
import { SliderBlock } from './SliderBlock/SliderBlock';
import { StarsBlock } from './StarsBlock/StarsBlock';
import { RateBlock } from './RateBlock/RateBlock';
import { CitiesBlock } from './CitiesBlock/CitiesBlock';
import { IDefaultSidebarValues, IFilters } from '../../types/types';
import styles from './SideBar.module.css';

interface ISideBarProps {
  defaultValues: IDefaultSidebarValues;
  addFilter: (filter: string, value: string | number) => void;
  filters: IFilters;
  isOpen: boolean;
}

export const SideBar = observer(
  ({ defaultValues, addFilter, filters, isOpen }: ISideBarProps) => {
    const { cities, minPrice, maxPrice } = defaultValues;

    const onChangePriceComplete = (value: number[]) => {
      addFilter(FILTERS_NAME.MIN_PRICE, value[0]);
      addFilter(FILTERS_NAME.MAX_PRICE, value[1]);
    };

    const onRatechange = (value: number) => {
      addFilter(FILTERS_NAME.STARS, value);
    };

    const onReviewChange = (value: number) => {
      addFilter(FILTERS_NAME.RATING, value);
    };

    const onCityChange = (value: string) => {
      addFilter(FILTERS_NAME.CITY, value);
    };

    return (
      <aside className={styles.container} style={{ display: !isOpen ? 'none' : 'flex' }}>
        <SliderBlock
          min={minPrice}
          max={maxPrice}
          onChangeComplete={onChangePriceComplete}
          title="Ваш бюджет (за ночь)"
        />
        <StarsBlock
          title="Количество звёзд"
          onChange={onRatechange}
          value={+filters.stars}
        />
        <RateBlock
          title="Оценка по отзывам"
          onChange={onReviewChange}
          items={REVIEW_MENU_ITEM}
          value={+filters.rating}
        />
        <CitiesBlock
          title="Город"
          onChange={onCityChange}
          items={cities}
          value={filters.city ? filters.city.toString() : ''}
        />
      </aside>
    );
  }
);
