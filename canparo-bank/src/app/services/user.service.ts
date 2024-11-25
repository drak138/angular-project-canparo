import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of, tap, } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class userService {
  private apiUrl = 'http://localhost:3000/api/users'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Get all items
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new item
  addUsers(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user).pipe(
    tap((response:any)=>{
      const token=response.token
      this.setCookie('authToken', JSON.stringify(token), 1);
      this.http.post('http://localhost:3000/api/users', user).subscribe((response: any) => {
        console.log(response); // Access the token
      });
      return of (token)})
    )
  }
  setCookie(name: string, value: string, days: number): void {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;Secure;SameSite=Strict`;
  }
  getCookie(name: string): string | null {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) {
        return value;
      }
    }
    return null;
  }

  isLoggedIn(): boolean {
    const token = this.getCookie('authToken');
    if (!token) {
      return false; // No token means the user is not logged in
    }
  
    try {
      const decoded: any = jwtDecode(token); // Decode the token
      const currentTime = Date.now() / 1000; // Current time in seconds
      return decoded.exp > currentTime; // Check if token has expired
    } catch (error) {
      console.error('Invalid token:', error);
      return false; // Invalid token means user is not logged in
    }
  }

}

