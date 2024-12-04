import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of, tap, BehaviorSubject, catchError, throwError } from 'rxjs';

interface registerData{
  firstName:String;
  lastName:string;
  email:string;
  phoneNumber:number;
  address:string;
  password:string;
  rePassword:string;
}
interface loginData{
  email:String;
  password:string
}
interface changePassData{
  oldPassword:string;
  newPassword:string;
  confirmNewPassword:string
}

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
  getUsers(){
    const token = this.getCookie('authToken');
    if (!token) {
      return 
    } 
    const decoded:any=jwtDecode(token)
    return decoded
  }
  

  // Add a new item
  addUsers(user: registerData): Observable<any> {
    return this.http.post<any>(this.apiUrl, user).pipe(
    tap((response:any)=>{
      if(response.error){
        this.errorInSubject.next(response.error)
        return
      }
      const token=response.token
      this.setCookie('authToken', JSON.stringify(token), 1);
      this.isLoggedIn()
      return of (token)})
    )
  }

  loginUser(data:loginData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`,data).pipe(
      tap((response:any)=>{
        if(response.error){
          this.errorInSubject.next(response.error)
          return
        }
        const token=response.token
        this.setCookie('authToken', JSON.stringify(token), 1);
        this.isLoggedIn()
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
      if(isLoggedIn===false){
        this.logout()
      }
      this.loggedInSubject?.next(isLoggedIn)
      return isLoggedIn;// Check if token has expired
    } catch (error) {
      this.setCookie('authToken', '', -1)
      this.loggedInSubject?.next(false);
      return false;
    }
  }
  changePass(data:changePassData): Observable<any>{
    const {oldPassword,newPassword}=data
    const token=this.getCookie('authToken')
    if(!token){
      return of({ error: 'No authentication token found. Please log in.' });
    }
    const decode: any=jwtDecode(token)
    const userId=decode._id
    return this.http.post<any>(`${this.apiUrl}/changePass`,{oldPassword,newPassword,userId}).pipe(
      tap((response:any)=>{
        if(response.error){
          this.errorInSubject.next(response.error)
          throw new Error(response.error); // Propagate the error
        }
        
        return this.logout()}),
        catchError((error) => {
          // Handle unexpected errors from the server
          this.errorInSubject.next(error.message || 'An unexpected error occurred.');
          return throwError(() => error);
        })
      )
  }
  getUserId(){
    const token = this.getCookie('authToken');
    if (!token) {
      this.loggedInSubject?.next(false);
      return 
    } 
    const decoded:any=jwtDecode(token)
    return decoded._id
  }
  deleteUser():Observable<any>{
    const userId=this.getUserId()
    if(userId===undefined){
      return of({error:'No authentication token found. Please log in.'})
    }
    return this.http.post<any>(`${this.apiUrl}/deleteUser`,{userId}).pipe(
      tap((response:any)=>{
        if(response.error){
          this.errorInSubject.next(response.error)
          throw new Error(response.error); // Propagate the error
        }
        
        return this.logout()}),
        catchError((error) => {
          // Handle unexpected errors from the server
          this.errorInSubject.next(error.message || 'An unexpected error occurred.');
          return throwError(() => error);
        })
    )
  }
}

