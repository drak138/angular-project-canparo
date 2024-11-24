import { Component, ViewChild } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink ,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
@ViewChild("loginForm") form: NgForm|undefined

loginHandler(){
  console.log(this.form?.value.email)
}
}
