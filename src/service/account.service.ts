import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../entity/Account';
import { JwtToken } from '../entity/JwtToken';

const post_url = "http://localhost:8080/api/v1/auth/signup"

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  createUser(user:Account){
    return this.http.post(post_url, user);
  }

  constructor(private http:HttpClient) { }
}
