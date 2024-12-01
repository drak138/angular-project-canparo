import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'http://localhost:3000/api/card';

  constructor() { }
}
