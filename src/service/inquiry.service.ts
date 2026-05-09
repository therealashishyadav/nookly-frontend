import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inquiry } from '../entity/Inquiry';
import { environment } from '../Environments/environment.prod';

// const post_url = "http://localhost:8080/inquiry/sendMessage";
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class InquiryService {

  postInquiry(inquiry: Inquiry) {
    return this.http.post(apiUrl + '/inquiry/sendMessage', inquiry);
  }

  constructor(private http: HttpClient) { }
}
