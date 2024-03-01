import { makeAutoObservable } from 'mobx';
import { FiltersType, IFilters, IHotel, ISearchData } from '../../types/types';
import { getHotels } from '../../api/hotelsApi';
import { DATA_URL } from '../../constants/constants';
import { filterHotels } from '../../helpers/filterHandlers';

class HotelsStore {
  private _hotels: IHotel[] = [];
  loading: boolean = false;
  error: string = '';
  filters: IFilters = { stars: 3 };
  private _searchData: ISearchData = { guests: 2 };
  defaultMinPrice = 5000;
  defaultMaxPrice = 0;
  defaultCities: string[] = [];
  _currentHotel: IHotel | null = null;

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

  findHotelById = (id: number) => {
    const data = this._hotels.find((hotel) => hotel.id === id);
    if (data) {
      this.setCurrentHotel(data);
    }
  };

  get currentHotel() {
    return this._currentHotel;
  }

  addFilter = (filter: FiltersType, value: string | number) => {
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
    for (let i = 0; i < this.hotels.length; i++) {
      const element = this.hotels[i];
      if (element.price < this.defaultMinPrice) {
        this.defaultMinPrice = element.price;
      }
      if (element.price > this.defaultMaxPrice) {
        this.defaultMaxPrice = element.price;
      }
      if (!this.defaultCities.includes(element.address.city)) {
        this.defaultCities.push(element.address.city);
      }
    }
    return {
      cities: this.defaultCities,
      minPrice: this.defaultMinPrice,
      maxPrice: this.defaultMaxPrice,
    };
  }

  setSearchGuests = (guests: number) => {
    this.searchData.guests = guests;
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

  setCurrentHotel = (data: IHotel) => {
    this._currentHotel = data;
  };
}

export default new HotelsStore();
