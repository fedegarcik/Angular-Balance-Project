import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { authResponse } from '../models/auth.model';
import { logoutStatus, myData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private store: Store<any>) { }

  getSomeData() {
    return this.http.get<myData>("/api/auth/database")
  }

  logout(){
    return this.http.get<logoutStatus>("/api/auth/logout")
  }

  updateQuote(quote: string){
    return this.http.put<authResponse>("/api/auth/updateQuote", {
      quote
    });
  }

  getAllState(){
    return this.store.select('appReducer');

  }
}
