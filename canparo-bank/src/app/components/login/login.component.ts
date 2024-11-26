import { userService } from './../../services/user.service';
import { Component, ViewChild } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink ,FormsModule],
  providers:[userService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
@ViewChild("loginForm") form: NgForm|undefined
constructor(private userService:userService){}
loginHandler(){
  this.userService.loginUser(this.form?.value)
}
}
