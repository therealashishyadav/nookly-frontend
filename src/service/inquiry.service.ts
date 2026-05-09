import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inquiry } from '../entity/Inquiry';

const post_url = "http://localhost:8080/inquiry/sendMessage";

@Injectable({
  providedIn: 'root'
})

export class InquiryService {

  postInquiry(inquiry: Inquiry) {
    return this.http.post(post_url, inquiry);
  }

  constructor(private http: HttpClient) { }
}
