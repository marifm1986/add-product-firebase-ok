import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../manage-user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl = 'https://amproducts-a9503-default-rtdb.firebaseio.com/users.json';
  constructor(private _http: HttpClient) { }
// push user
  addUser(user: User) {
    return this._http.post<User>(this.baseUrl, user);
  }

  getUsers() {
    return this._http.get<User>(this.baseUrl);
  }

  deleteUser(userId: string) {
    return this._http.delete(this.baseUrl + '/' + userId);
  }
}
