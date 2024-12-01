import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TransferFormComponent } from '../transfer-form/transfer-form.component';

@Component({
  selector: 'app-create-bill',
  standalone: true,
  imports: [CommonModule,TransferFormComponent],
  templateUrl: './create-bill.component.html',
  styleUrl: './create-bill.component.css'
})
export class CreateBillComponent {
  btn={
    text:'Създай Сметка',
    class:"create-bill-btn"
  }
}
