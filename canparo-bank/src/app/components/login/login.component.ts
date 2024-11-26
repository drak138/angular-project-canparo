import { userService } from './../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrComponent } from '../err/err.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink ,FormsModule,CommonModule,ErrComponent],
  providers:[userService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  errorMessage=""
  ngOnInit(): void {
    this.userService.errorIn$.subscribe((errorIn)=>{
      this.errorMessage=errorIn
      console.log(errorIn)
    })
  }
@ViewChild("loginForm") form: NgForm|undefined
constructor(private userService:userService){}
loginHandler(){
  this.userService.loginUser(this.form?.value)
}
}
