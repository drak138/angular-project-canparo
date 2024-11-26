import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of, tap, BehaviorSubject, map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class userService {
  private apiUrl = 'http://localhost:3000/api/users';
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  private errorInSubject= new BehaviorSubject<string>("")

  loggedIn$ = this.loggedInSubject.asObservable();
  errorIn$=this.errorInSubject.asObservable()

  constructor(private http: HttpClient) {
  }

  // Get all items
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  

  // Add a new item
  addUsers(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user).pipe(
    tap((response:any)=>{
      if(!response.token){
        console.log(response)
        this.errorInSubject.next(response)
        return
      }
      console.log(response)
      const token=response.token
      this.setCookie('authToken', JSON.stringify(token), 1);
      this.loggedInSubject.next(true);
      return of (token)})
    )
  }

  loginUser(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`,data).pipe(
      tap((response:any)=>{
        const token=response.token
        this.setCookie('authToken', JSON.stringify(token), 1);
        this.loggedInSubject.next(true);
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


  logout():void{
    this.setCookie('authToken', '', -1)
    this.isLoggedIn()
  }

  isLoggedIn(): boolean {
    const token = this.getCookie('authToken');
    if (!token) {
      this.loggedInSubject?.next(false);
      return false; // No token means the user is not logged in
    }
  
    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      const isLoggedIn = decoded.exp > currentTime;
      this.loggedInSubject?.next(isLoggedIn)
      return isLoggedIn;// Check if token has expired
    } catch (error) {
      console.error('Invalid token:', error);
      this.loggedInSubject?.next(false);
      return false;
    }
  }

}

