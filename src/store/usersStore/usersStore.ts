import { makeAutoObservable } from 'mobx';
import { IUser } from '../../types/types';

class UsersStore {
  private _users: IUser[] = [];
  error: string = '';
  isLoading: boolean = false;
  isCompleted: boolean = false;

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
        this.setIsCompleted(true);
      } else {
        this.setError('Такой пользователь уже зарегистрирован');
      }
      this.setLoading(false);
    }, 1000);
  };

  setLoading = (value: boolean) => {
    this.isLoading = value;
  };

  setIsCompleted = (value: boolean) => {
    this.isCompleted = value;
  };

  setError = (value: string) => {
    this.error = value;
  };

  findUser = (email: string, password: string) => {
    return this._users.find((item) => item.email === email && item.password === password);
  };

  findUserById = (id: number) => {
    return this._users.findIndex((item) => item.id === id);
  };

  loginUser = (email: string, password: string) => {
    this.setError('');
    const user = this.findUser(email, password);
    if (user) {
      user.isAuth = true;
    }
    return user;
  };

  updateProfile = (data: IUser) => {
    const userIndex = this.findUserById(data.id);
    if (userIndex !== -1) {
      this._users[userIndex] = data;
    }
  };
}

export default new UsersStore();
