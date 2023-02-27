import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private auth: AuthService, private router: Router){

  }


  registerUser(event : any){
    event.preventDefault()
    const target = event.target;

    const errors = [];
    const username = target.querySelector("#username").value;
    const password = target.querySelector("#password").value;
    const cpassword = target.querySelector("#cpassword").value;

    if(cpassword != password)
      errors.push("Passwords do not match")


      if(errors.length === 0){
        this.auth.registerUser(username, password).subscribe(data => {
          console.log(data);
          if(data.success){
            this.auth.setLoggedIn(true);
            this.router.navigate(['dashboard']);
          }
          else{
            window.alert("Username already in use");
          }
        });
      }
  }
}
