import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/items'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Get all items
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new item
  addItem(item: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, item);
  }
}

