import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setToken(token: string) {
    localStorage.setItem('TOKEN', token);
  }

  removeToken() {
    localStorage.removeItem('TOKEN');
  }

  decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (error) {
      console.log(error);
      return null;
    }
  }

}
