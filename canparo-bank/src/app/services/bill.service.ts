import { catchError, Observable,of, tap, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { userService } from './user.service';

interface userBill{
  billName:string;
  balance:number
}

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private apiUrl = 'http://localhost:3000/api/bills';


  constructor(private http:HttpClient,private userService:userService) { }
  createUserBill(userBill:userBill): Observable<any>{
    const userId=this.userService.getUserId()
    if(userId===undefined){
      return of({error:'No authentication token found. Please log in.'})
    }
    return this.http.post<any>(this.apiUrl,{billName:userBill.billName,balance:userBill.balance,ownerId:userId}).pipe(
      tap((response:any)=>{
      }),catchError((error)=>{
        return throwError(() => error);
      })
    )
  }
  checkUserBills():Observable<any>{
    const token=this.userService.getCookie('authToken')
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, 
    });
    return this.http.get(this.apiUrl,{headers}).pipe(
      tap((response) => {
        console.log(response)
      })
    )
  }
}
