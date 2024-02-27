import { makeAutoObservable } from 'mobx';
import { FiltersType, IFilters, IHotel, ISearchData } from '../../types/types';
import { getHotels } from '../../api/hotelsApi';
import { DATA_URL } from '../../constants/constants';
import { filterHotels } from '../../helpers/filterHandlers';

class HotelsStore {
  private _hotels: IHotel[] = [];
  loading: boolean = false;
  error: string = '';
  filters: IFilters = {};
  private _searchData: ISearchData = { city: '', guests: 2 };

  constructor() {
    makeAutoObservable(this);
  }

  fetchList = async () => {
    this.setLoading(true);
    setTimeout(async () => {
      try {
        const list = await getHotels(DATA_URL);

        if (list instanceof Array) {
          this.setHotels(list);
        }
      } catch (e: unknown) {
        this.error = 'Не удалось загрузить данные.';
      } finally {
        this.setLoading(false);
      }
    }, 2000);
  };

  setLoading = (value: boolean) => {
    this.loading = value;
  };

  setHotels = (hotels: IHotel[]) => {
    this._hotels = hotels;
  };

  setFilters = (filters: IFilters) => {
    this.filters = filters;
  };

  getHotelById = (id: number) => {
    return this._hotels.find((hotel) => hotel.id === id);
  };

  addFilter = (filter: FiltersType, value: string) => {
    this.filters = { ...this.filters, [filter]: value };
  };

  removeFilter = (filter: FiltersType) => {
    const copy = Object.assign({}, this.filters);
    delete copy[filter];
    this.setFilters(copy);
  };

  clearFilters = () => {
    this.filters = {};
  };

  private filterHotels = () => {
    if (!Object.keys(this.filters)) {
      return this._hotels;
    } else {
      return filterHotels(this._hotels, this.filters);
    }
  };

  get hotels() {
    return this.filterHotels();
  }

  get sidebarPanelData() {
    let minPrice = 5000;
    let maxPrice = 0;
    const cities: string[] = [];

    for (let i = 0; i < this.hotels.length; i++) {
      const element = this.hotels[i];
      if (element.price < minPrice) {
        minPrice = element.price;
      }
      if (element.price > maxPrice) {
        maxPrice = element.price;
      }
      if (!cities.includes(element.address.city)) {
        cities.push(element.address.city);
      }
    }
    return {
      cities,
      minPrice,
      maxPrice,
    };
  }

  setSearchGuests = (guests: number) => {
    this.searchData.guests = guests;
  };

  setSearchCity = (city: string) => {
    this.searchData.city = city;
  };

  setSearchStartDate = (date: string) => {
    this.searchData.startDate = date;
  };

  setSearchEndDate = (date: string) => {
    this.searchData.endDate = date;
  };
  get searchData() {
    return this._searchData;
  }
}

export default new HotelsStore();
