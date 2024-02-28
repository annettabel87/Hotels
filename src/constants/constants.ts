import { IReviewMenuItem } from '../types/types';

export const DATA_URL = '/hotelsData.json';

export const FILTERS_NAME = {
  CITY: 'city',
  MIN_PRICE: 'minPrice',
  MAX_PRICE: 'maxPrice',
  RATING: 'rating',
  STARS: 'stars',
};

export const LOCAL_STORAGE_KEYS = {
  USER_DATA: 'user',
};

export const ROUTE = {
  MAIN: '/',
  REGISTER: '/register',
  LOGIN: '/login',
  HOTELS: '/hotels',
  HOTEL_CARD: '/hotels/:hotelId',
  PROFILE: '/profile',
  ALL: '*',
};

export const layoutForm = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export const REVIEW_MENU_ITEM: IReviewMenuItem[] = [
  { value: 9, label: 'Супер: 9+' },
  { value: 8, label: 'Отлично: 8+' },
  { value: 7, label: 'Очень хорошо: 7+' },
  { value: 6, label: 'Хорошо: 6+' },
  { value: 5, label: 'Неплохо: 5+' },
];
