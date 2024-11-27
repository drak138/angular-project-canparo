import { userService } from './../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
    })
  }
@ViewChild("loginForm") form: NgForm|undefined
constructor(private userService:userService,private router:Router){}
loginHandler(){
  this.userService.loginUser(this.form?.value).subscribe(
    (response) => {
    if(!response.token){
      return
    }
    console.log('User added successfully:', response);
    this.router.navigate(["/home"])
    this.form?.reset()
  },
  (error) => {
    console.error('Error adding user:', error);
    // Handle error, e.g., show an error message
  })
}
}
