import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/services/auth.service';
import { UserService } from 'app/shared/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private router: Router, private user: UserService, private auth: AuthService) {

  }


  ngOnInit() {
    this.user.logout().subscribe(data => {
      if(data.success)
      {
        this.router.navigate(['login'])
        this.auth.setLoggedIn(false);
      }
      else
        window.alert("some problem")
    })
  }

}
