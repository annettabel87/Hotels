import { FILTERS_NAME } from '../constants/constants';

export interface IHotel {
  id: number;
  title: string;
  description: string;
  raring: number;
  address: {
    city: string;
    street: string;
  };
  type: HotelsType;
  img: string;
  photo: IHotelPhotoType[];
  price: number;
  stars: number;
  reviews: Ireview[];
}

export interface Ireview {
  id: number;
  userName: string;
  review: string;
  rating: number;
}
export type HotelsType = 'Отель' | 'Апартаменты' | 'Гостевой дом';

export interface IHotelPhotoType {
  id: number;
  url: string;
}

export type FiltersType = (typeof FILTERS_NAME)[keyof typeof FILTERS_NAME];

export type IFilters = {
  [index: FiltersType]: string;
};