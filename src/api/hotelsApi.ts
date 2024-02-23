import { IHotel } from '../types/types';

export const getHotels = async (url: string): Promise<IHotel[]> => {
  const response = await fetch(url);
  const data: IHotel[] = await response.json();
  return data;
};
