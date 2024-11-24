import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/users'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Get all items
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new item
  addUsers(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}

