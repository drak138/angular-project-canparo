import { Observable } from 'rxjs';
import { Data } from './../../../../node_modules/memfs/lib/fsa/types.d';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface contactForm{
  email:string;
  theme:string;
   content:string
}
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/api/send-email'

  constructor(private http:HttpClient) { }

  contact(Data:contactForm):Observable<any>{
    const body={
      ...Data
    }
    return this.http.post(this.apiUrl,body)
  }
}
