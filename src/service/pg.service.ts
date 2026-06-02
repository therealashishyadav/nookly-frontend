import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PGListing } from '../entity/PGListing';
import { environment } from '../environments/environment';

// const SHOW_PG_URL = 'http://localhost:8080';
// const ADD_PG_URL = 'http://localhost:8080/api/pg-listings';

const apiUrl = environment.apiUrl;
const SHOW_PG_URL = apiUrl;
const ADD_PG_URL = `${apiUrl}/api/pg-listings`;

@Injectable({
  providedIn: 'root'
})
export class PgService {

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
  }

  getMyPGs(): Observable<any[]> {
  return this.http.get<any[]>(`${ADD_PG_URL}/owner`, {
    headers: this.getAuthHeaders()
  });
}

  deletePG(id: number): Observable<any> {
    return this.http.delete(`${ADD_PG_URL}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  updatePG(id: number, pg: any): Observable<any> {
    return this.http.put(`${ADD_PG_URL}/${id}`, pg, {
      headers: this.getAuthHeaders()
    });
  }

  getAllPGs(): Observable<PGListing[]> {
    return this.http.get<PGListing[]>(`${SHOW_PG_URL}`);
  }

  getPGById(id: number): Observable<PGListing> {
    return this.http.get<PGListing>(`${SHOW_PG_URL}/${id}`);
  }

  searchByCity(city: string): Observable<PGListing[]> {
    return this.http.get<PGListing[]>(`${SHOW_PG_URL}/search?city=${city}`);
  }
}