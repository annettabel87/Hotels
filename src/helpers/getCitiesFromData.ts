import { IHotel } from '../types/types';

export const getCitiesFromData = (hotels: IHotel[], value: string) => {
  const cities = hotels.map((hotel) => hotel.address.city);
  const citiesArray = Array.from(new Set(cities));
  return citiesArray.filter((item) => item.toLowerCase().includes(value.toLowerCase()));
};
