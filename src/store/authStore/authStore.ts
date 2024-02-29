import { makeAutoObservable } from 'mobx';
import { IReservation, IUser, BookingStatusType } from '../../types/types';
import usersStore from '../usersStore/usersStore';
import { LOCAL_STORAGE_KEYS } from '../../constants/constants';

class AuthStore {
  private _profile: IUser | null = null;
  isLoading: boolean = false;
  error: string = '';
  bookingStatus: BookingStatusType = null;
  bookingError: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  get isAuth() {
    return this._profile !== null;
  }

  setProfile = (profile: IUser | null) => {
    this._profile = profile;
  };

  setLoading = (value: boolean) => {
    this.isLoading = value;
  };

  setError = (value: string) => {
    this.error = value;
  };

  checkLogin = () => {
    this.setLoading(true);
    const user = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);
    if (user) {
      this.setProfile(JSON.parse(user) as IUser);
    }
    this.setLoading(false);
  };

  login = (email: string, password: string) => {
    this.setError('');
    this.setLoading(true);
    setTimeout(() => {
      try {
        const user = usersStore.loginUser(email, password);
        if (user) {
          this.setProfile(user);
          localStorage.setItem(
            LOCAL_STORAGE_KEYS.USER_DATA,
            JSON.stringify(this.profile)
          );
        } else {
          throw new Error();
        }
      } catch (error) {
        this.setError('Не верный email или пароль');
      } finally {
        this.setLoading(false);
      }
    }, 1000);
  };

  logout = () => {
    this.setProfile(null);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_DATA);
  };

  get profile() {
    return this._profile;
  }

  addReservation = (data: IReservation) => {
    if (this.profile) {
      this.profile.history = [data, ...this.profile.history];
    }
  };

  booking = async (data: IReservation) => {
    try {
      new Promise((res, rej) => {
        this.bookingStatus = 'pending';
        const random = Math.random();
        if (random > 0.5) {
          res(
            setTimeout(() => {
              this.bookingStatus = 'booking';
              this.addReservation(data);
            }, 2000)
          );
        } else {
          rej(
            setTimeout(() => {
              this.bookingStatus = 'reject';
            }, 2000)
          );
        }
      });
    } catch (error) {
      this.bookingError = 'Что-то пошло не так...';
    } finally {
      this.bookingStatus = null;
    }
  };
}

export default new AuthStore();
