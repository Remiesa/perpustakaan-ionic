import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://127.0.0.1:8000/api/data';

  constructor(private http: HttpClient) {}

  getSavedBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  saveUserData(u_id: number, b_id: number): Observable<any> {
    const data = {
      user_id: u_id,
      buku_id: b_id,
    };

    return this.http.post<any>(this.apiUrl, data);
  }
}
