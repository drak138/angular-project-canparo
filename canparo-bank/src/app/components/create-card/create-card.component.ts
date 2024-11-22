import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { Component} from '@angular/core';

@Component({
  selector: 'app-create-card',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-card.component.html',
  styleUrl: './create-card.component.css'
})
export class CreateCardComponent {
  form: FormGroup;

Models=[
  {model:"Visa"},
  {model:"MasterCard"},
]
Types=[
  {type:"Debit"},
  {type:"Credit"}
]
constructor(private fb: FormBuilder) {
  this.form = this.fb.group({
    cardType: ['Debit'],
    creditAmount: [{ value: 0, disabled: true }]

})
  // Enable/disable creditAmount based on cardType selection
  this.form.get('cardType')?.valueChanges.subscribe((value) => {
    if (value === 'Credit') {
      this.form.get('creditAmount')?.enable();
    } else {
      this.form.get('creditAmount')?.disable();
    }
  })
}
}
