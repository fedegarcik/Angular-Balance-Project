import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/services/auth.service';
import { response } from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private auth: AuthService, private router: Router){

  }


  loginUser(event : any){
    event.preventDefault()
    const target = event.target;
    const username = target.querySelector("#username").value;
    const password = target.querySelector("#password").value;


    this.auth.getUserDetails(username, password).subscribe({
    next : (response) => {
      if(response.success)
        this.auth.setLoggedIn(true);
        this.router.navigate(['dashboard'])
    },
    error: (e) => {
      window.alert(e.error.info)
    }})
  }
}
