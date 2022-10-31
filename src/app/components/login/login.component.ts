import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/common/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService) {}

  email!:string;
  password!:string;

  ngOnInit(): void {
   
  }
 
  submit(){
   this.authService.login(this.email,this.password);
  }

}
