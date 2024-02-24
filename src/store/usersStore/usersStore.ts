import { makeAutoObservable } from 'mobx';
import { IUser } from '../../types/types';

class UsersStore {
  private _users: IUser[] = [];
  error: string = '';
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  addUser = (user: Omit<IUser, 'id' | 'isAuth'>) => {
    this.setError('');
    this.setLoading(true);

    setTimeout(() => {
      const finedUser = this.findUser(user.email, user.password);
      if (!finedUser) {
        const newUser = { ...user, id: Math.random(), isAuth: false };
        this._users = [...this._users, newUser];
      } else {
        this.setError('Такой пользователь уже зарегистрирован');
      }
      this.setLoading(false);
    }, 1000);
  };

  setLoading = (value: boolean) => {
    this.isLoading = value;
  };

  setError = (value: string) => {
    this.error = value;
  };

  findUser = (email: string, password: string) => {
    return this._users.find((item) => item.email === email && item.password === password);
  };

  loginUser = (email: string, password: string) => {
    this.setError('');
    const user = this.findUser(email, password);
    if (user) {
      user.isAuth = true;
    }
    return user;
  };
}

export default new UsersStore();
