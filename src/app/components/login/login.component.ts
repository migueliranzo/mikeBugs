import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  invalidCredentials: boolean = false;
  isSigning: boolean = false;
  isResetingPassword: boolean = false;

  constructor(public authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  repeatPasswordFormControl = new FormControl('', [Validators.required, Validators.minLength(6), this.passwordMatch()]);

  matcher = new ErrorStateMatcher();

  ngOnInit(): void {
  }

  submit(){

    if(this.isSigning){
      this.authService.createAccount(this.emailFormControl.value as string, this.passwordFormControl.value as string).subscribe(error=>{
        error ? this.invalidCredentials = true : this.router.navigateByUrl("project-management");
      });
    }else{
      this.authService.login(this.emailFormControl.value as string,this.passwordFormControl.value as string).subscribe(error=> {
        error ? this.invalidCredentials = true : this.router.navigateByUrl("project-management");
      });
    }
  }

  resetPassword(){
    this.isResetingPassword = true;
    this.authService.resetMail(this.emailFormControl.value as string).subscribe(x=>{
      if(x){
        this.invalidCredentials = true 
      }else{
        this.invalidCredentials = false;
        this.snackBar.open("Email sent!", "OK",{verticalPosition:'bottom',horizontalPosition:'left', duration: 1200});
      }
    });
  }

  valid(){

  if(this.isSigning){

    if(this.passwordFormControl.valid && this.emailFormControl.valid && this.repeatPasswordFormControl.valid){
      return false;
    }
  }else{

    if(this.passwordFormControl.valid && this.emailFormControl.valid){
      return false;
    } 
  }
  return true;
}

passwordMatch(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if(control.value == this.passwordFormControl.value){
      return null;
    }else{
      return {passwordMatch: {value: control.value}};
    }
  };
}

}