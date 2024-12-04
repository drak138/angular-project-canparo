import { userService } from './../../services/user.service';
import { Component,ViewChild } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrComponent } from '../err/err.component';

@Component({
  selector: 'app-change-pass',
  standalone: true,
  imports: [FormsModule,ErrComponent],
  providers:[userService],
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.css'
})
export class ChangePassComponent{
  errorMessage=""

  constructor(private userService:userService,private router:Router){}
  @ViewChild("changePassForm") form: NgForm|undefined

  changeHandler(){
    if(this.form?.value.newPassword!==this.form?.value.confirmNewPassword&& this.form?.value.newPassword.lenght!==0){
      alert("Passwords do not match!")
      return
    }else{
    this.userService.changePass(this.form?.value).subscribe(
      (response) => {
        this.router.navigate(["auth/login"])
      },
      (error) => {
        this.errorMessage = error || 'Failed to change password.';
        setTimeout(() => {
          this.errorMessage = ""
        }, 1500);
      }
    )
  }
  }

}
