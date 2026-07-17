import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../entity/Account';
import { environment } from '../environments/environment';

// const post_url = "http://localhost:8080/api/v1/auth/signup"
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  createUser(user: Account): Observable<any> {
    return this.http.post(apiUrl + '/api/v1/auth/signup', user);
  }

  updateUser(user: Account): Observable<Account> {
    return this.http.put<Account>(apiUrl + '/api/v1/account', user);
  }

  changePassword(passwordData: { currentPassword: string; newPassword: string; confirmPassword: string }): Observable<any> {
    return this.http.post(apiUrl + '/api/v1/account/change-password', passwordData);
  }

  deactivateAccount(): Observable<any> {
    return this.http.post(apiUrl + '/api/v1/account/deactivate', {});
  }

  constructor(private http: HttpClient) { }
}

