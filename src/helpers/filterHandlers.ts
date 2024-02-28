import { FILTERS_NAME } from '../constants/constants';
import { IFilters, IHotel } from '../types/types';

const filterHotelsHandler = {
  filterByCity(hotels: IHotel[], filterCity: string) {
    return hotels.filter((item) => item.address.city === filterCity);
  },

  filterByMinPrice(hotels: IHotel[], minPrice: number) {
    return hotels.filter((item) => item.price >= minPrice);
  },

  filterByMaxPrice(hotels: IHotel[], maxPrice: number) {
    return hotels.filter((item) => item.price <= maxPrice);
  },

  filterByRating(hotels: IHotel[], rating: number) {
    return hotels.filter((item) => item.raring >= rating);
  },
  filterByStars(hotels: IHotel[], stars: number) {
    return hotels.filter((item) => item.stars >= stars);
  },
};

export const filterHotels = (hotels: IHotel[], filters: IFilters) => {
  let result: IHotel[] = hotels;
  for (const key in filters) {
    const value = filters[key];

    switch (key) {
      case FILTERS_NAME.CITY:
        result = filterHotelsHandler.filterByCity(result, value.toString());

        break;
      case FILTERS_NAME.MIN_PRICE:
        result = filterHotelsHandler.filterByMinPrice(result, +value);
        break;
      case FILTERS_NAME.MAX_PRICE:
        result = filterHotelsHandler.filterByMaxPrice(result, +value);
        break;
      case FILTERS_NAME.RATING:
        result = filterHotelsHandler.filterByRating(result, +value);
        break;
      case FILTERS_NAME.STARS:
        result = filterHotelsHandler.filterByStars(result, +value);
        break;
      default:
        break;
    }
  }
  return result;
};
