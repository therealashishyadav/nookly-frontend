import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PgModel } from '../entity/PgModel';
import { Observable } from 'rxjs';

const post_pg_url = "http://localhost:8080/addPGWithFiles"

@Injectable({
  providedIn: 'root'
})
export class PgdetailsService {

postPg(formData: FormData) {
  return this.http.post(post_pg_url, formData);
}

  private apiUrl = 'http://localhost:8080/api/pgs';

  getAllPGs(): Observable<PgModel[]> {
    return this.http.get<PgModel[]>(this.apiUrl);
  }

  getPGById(id: number): Observable<PgModel> {
    return this.http.get<PgModel>(`${this.apiUrl}/${id}`);
  }

  updatePG(id: number, pg: PgModel): Observable<PgModel> {
    return this.http.put<PgModel>(`${this.apiUrl}/${id}`, pg);
  }

  deletePG(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  constructor(private http:HttpClient) { }
}
