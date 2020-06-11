import { Injectable } from '@angular/core';
import {UserModel} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  setLoggedInUser(user: UserModel) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
