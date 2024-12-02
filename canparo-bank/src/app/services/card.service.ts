import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of,Observable,tap, throwError } from 'rxjs';
import { userService } from './user.service';
interface cardInfo{
  account:string;
  model:string;
  type:string;
  creditAmount:number
}

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'http://localhost:3000/api/card';

  constructor(private http:HttpClient,private userService:userService) { }
  createCard(cardInfo:cardInfo): Observable<any> {
    const userId=this.userService.getUserId()
    return this.http.post(this.apiUrl,{cardInfo,userId}).pipe(
      tap((respnonse)=>{
      })
    )
  }
  getCards(IBAN:string): Observable<any>{
    const token=this.userService.getCookie('authToken')
    if(!token){
      return throwError(() => new Error("User is not authenticated"));
    }
    const headers = new HttpHeaders({
      Authorization:token,
      IBAN
    });
    return this.http.get<any>(this.apiUrl,{headers}).pipe(
      tap((response)=>{
        console.log(response)
      })
    )
  }
}
