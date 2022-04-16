import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginCredentials } from '../login-credentials';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseURL = "http://localhost:8080/ss/auth/login";

  constructor(private httpClient: HttpClient) { }

  login(loginCredentials: LoginCredentials): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}`, loginCredentials);
  }
}
