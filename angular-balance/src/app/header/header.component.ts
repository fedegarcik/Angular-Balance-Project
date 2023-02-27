import { Component } from '@angular/core';
import { UserService } from 'app/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  greetMessage = "Loading";
  logout = true;

  constructor(private user: UserService){

  }

  ngOnInit(){
    this.user.getAllState().subscribe({
      next: (state) => {
        this.greetMessage = state.login ? "Hello" + " " + state.user : "Guest"
      },
      error: (err) => {
        console.log(err)
      }
    })

  }
}
