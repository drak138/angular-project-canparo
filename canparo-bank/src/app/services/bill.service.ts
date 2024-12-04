import { catchError, Observable, of, tap, throwError} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { userService } from './user.service';

interface userBill{
  IBAN:string;
  billName:string;
  balance:number
}
interface transfer{
  biller:userBill;
  reciever:string;
  recieverIBAN:string;
  amount:number;
  reason:string;
  more:string;
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
        console.log(response)
      }),catchError((error)=>{
        return throwError(() => error);
      })
    )
  }
  checkUserBills():Observable<any>{
    const token=this.userService.getCookie('authToken')
    if(!token){
      return throwError(() => new Error("User is not authenticated"));
    }
    const headers = new HttpHeaders({
      Authorization:token, 
    });
    return this.http.get(this.apiUrl,{headers}).pipe(
      tap((response:any)=>{
        return response.hasBills
      })
    )
  }
  transfer(transfer:transfer):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/transfer`,transfer).pipe(
      tap((response:any)=>{
        if(response.error){
          throw new Error(response.error);
        }else{
          return response
        }
      }),catchError((error)=>{
      return throwError(() => error)
    })
  )
  }
  getHistory(filter:string,IBAN:string):Observable<any>{
    const token=this.userService.getCookie('authToken')
    if(!token){
      return throwError(() => new Error("User is not authenticated"));
    }
    const headers = new HttpHeaders({
      Authorization:token,
      filter,
      IBAN
    });
    return this.http.get(`${this.apiUrl}/history`,{headers}).pipe(
      tap((response)=>{
        return response
      })
    )
  }
  createMonthlyBill(transfer:transfer):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/createBill`,transfer).pipe(
      tap((response:any)=>{
        if(response.error){
          throw new Error(response.error);
        }else{
          return response
        }
      }),catchError((error)=>{
      return throwError(() => error)
    })
  )
  }
  getUserBills(IBAN:string):Observable<any>{
    const token=this.userService.getCookie('authToken')
    if(!token){
      return throwError(() => new Error("User is not authenticated"));
    }
    const headers = new HttpHeaders({
      Authorization:token,
      IBAN
    });
    return this.http.get(`${this.apiUrl}/getBill`,{headers})
  }
  deleteBill(billId:string):Observable<any>{
    const token=this.userService.getCookie('authToken')
    if(!token){
      return throwError(() => new Error("User is not authenticated"));
    }
    const body={
      Authorization:token,
      billId,
    }
    return this.http.post(`${this.apiUrl}/${billId}/delete`,body)
  }
  deleteUserBill(billId:string|undefined):Observable<any>{
    if(!billId){
      return throwError(() => new Error("Error getting bill"));
    }
    const token=this.userService.getCookie('authToken')
    if(!token){
      return throwError(() => new Error("User is not authenticated"));
    }
    const body={
      Authorization:token,
      billId,
    }
    return this.http.post(`http://localhost:3000/api/${billId}/delete`,body)
  }
}
