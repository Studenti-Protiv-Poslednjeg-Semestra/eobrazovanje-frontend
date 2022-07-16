import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditUser } from '../_models/edit-user';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = "http://localhost:8080/api/v1/users";

  constructor(private httpClient: HttpClient) { }

  getPersonalInfo(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseURL}/${userId}`);
  }

  updatePersonalInfo(editUser: EditUser): Observable<User> {
    return this.httpClient.put<User>(this.baseURL, editUser);
  }
}
