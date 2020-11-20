import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '@app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthFirebaseService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  private apiKey = 'AIzaSyBgs2ineSr6ZwecKVdiPGPHNv_C2lkdXZM';

  constructor(private http: HttpClient) {}
  logInFireBase(user: UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true,
    };

    return this.http.post(`${this.url}${this.apiKey}`, authData);
  }
}
