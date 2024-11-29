import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-transfers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.css'
})
export class TransfersComponent {
  @Input()transferHistory={
    reason:"",
    name:'',
    Date:'',
    transferType:'',
    amount:0,
    IBAN:''
  }
}
