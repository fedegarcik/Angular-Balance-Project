import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  message: string = "Loading..."
  username: string = "Loading..."

  constructor(private userSerivce: UserService, private router: Router){

  }

  ngOnInit() {
    this.userSerivce.getSomeData().subscribe({
      next : (response) =>{
        this.message = response.quote;
        this.username = response.username
        console.log(response.success)
        if(!response.success)
        {
          localStorage.removeItem('loggedIn');
          this.router.navigate(['logout']);
        }
      },
      error : (response) => {
        if(!response.success)
        {
          localStorage.removeItem('loggedIn');
          this.router.navigate(['logout']);
        }
      }
    });
  }

  updateQuote(e: any){
    const quote = e.target.parentNode.querySelector("#myQuote").value;
    this.userSerivce.updateQuote(quote).subscribe({
      next: (response) => {
        console.log(response.success)
        if(response.success){
          this.message = quote;
          alert("Your Quote Was Update Succefully")
        }
        else
          alert("Your quote couldnt be updated")
      },
      error : (response) => {
        window.alert(response.info);
      }
    })
  }
}
