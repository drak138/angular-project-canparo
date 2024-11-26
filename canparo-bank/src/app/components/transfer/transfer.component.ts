import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TransferFormComponent } from '../transfer-form/transfer-form.component';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule,TransferFormComponent],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent {
  formClass='transfer-form'
  btn={
    text:'Изпращане на превода',
    class:"send-transfer"
  }
}
