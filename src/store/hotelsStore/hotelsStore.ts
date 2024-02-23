import { makeAutoObservable } from 'mobx';
import { FiltersType, IFilters, IHotel } from '../../types/types';
import { getHotels } from '../../api/hotelsApi';
import { DATA_URL } from '../../constants/constants';
import { filterHotels } from '../../helpers/filterHandlers';

class HotelsStore {
  private _hotels: IHotel[] = [];
  loading: boolean = false;
  error: string = '';
  filters: IFilters = {};
  _cities: string[] = [];
  _minPrice: number = 0;
  _maxPrice: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  fetchList = async () => {
    this.loading = true;
    setTimeout(async () => {
      try {
        const list = await getHotels(DATA_URL);

        if (list instanceof Array) {
          this._hotels = list;
          this.getDataToSearchPanel();
        }
      } catch (e: unknown) {
        this.error = 'Не удалось загрузить данные.';
      } finally {
        this.loading = false;
      }
    }, 2000);
  };

  getHotelById = (id: number) => {
    return this._hotels.find((hotel) => hotel.id === id);
  };

  addFilter = (filter: FiltersType, value: string) => {
    this.filters[filter] = value;
    this._hotels = this.filterHotels();
    this.getDataToSearchPanel();
  };

  removeFilter = (filter: FiltersType) => {
    delete this.filters[filter];
    this._hotels = this.filterHotels();
    this.getDataToSearchPanel();
  };

  clearFilters = () => {
    this.filters = {};
    this._hotels = this.filterHotels();
    this.getDataToSearchPanel();
  };

  private filterHotels = () => {
    if (!Object.keys(this.filters)) {
      return this._hotels;
    } else {
      return filterHotels(this._hotels, this.filters);
    }
  };

  get hotels() {
    return this._hotels;
  }

  getDataToSearchPanel = () => {
    this._minPrice = this._hotels[0].price;
    this._maxPrice = this._hotels[0].price;

    for (let i = 0; i < this._hotels.length; i++) {
      const element = this._hotels[i];
      if (element.price < this._minPrice) {
        this._minPrice = element.price;
      }
      if (element.price > this._maxPrice) {
        this._maxPrice = element.price;
      }
      if (!this._cities.includes(element.address.city)) {
        this._cities.push(element.address.city);
      }
    }
  };

  get searchPanelData() {
    return {
      cities: this._cities,
      minPrice: this._minPrice,
      maxPrice: this._maxPrice,
    };
  }
}

export default new HotelsStore();
