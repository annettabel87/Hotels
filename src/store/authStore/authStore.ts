import { makeAutoObservable } from 'mobx';
import { IUser } from '../../types/types';
import usersStore from '../usersStore/usersStore';
import { LOCAL_STORAGE_KEYS } from '../../constants/constants';

class AuthStore {
  private _profile: IUser | null = null;
  isLoading: boolean = false;
  error: string = '';

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
}

export default new AuthStore();
