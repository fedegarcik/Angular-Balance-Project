import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { authResponse} from "../models/auth.model";
import { registerResponse} from "../models/register.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false')
  constructor(private httpClient : HttpClient) { }

  getUserDetails(username: string, password: string){
    //post details to API SERVER return answer
    return this.httpClient.post<authResponse>("/api/auth/login", {
      username,
      password
    })
  }

  get isLoggedIn(){
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }

  setLoggedIn(value: boolean){

    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true')
  }

  registerUser(username: string, password: string){
    return this.httpClient.post<registerResponse>('/api/auth/register', {
      username,
      password
    })
  }


}

