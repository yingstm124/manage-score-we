import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../model/user';
import { ServerService } from './server.service';


const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  public server;
  public username = new Subject()


  constructor(
    private http: HttpClient,
    private serverServe: ServerService
  )
  {
    this.server = this.serverServe.getBackendService()
  }


  public login(email:string, password:string): Observable<User>{
    console.log('login '+email+" "+password)

    let user_json = {
      'email': email,
      'password': password
    }
    return this.http.post<User>(this.server+`/login`, user_json, httpOptions)
    .pipe(map(user => {
      console.log('user ',user)

      if(user != null){
        localStorage.setItem('username', user.userName)
        localStorage.setItem('email', user.email)
        localStorage.setItem('isLogined', "true")
      }

      return user
    }))
  }

  public isLogined():boolean{
    let loginstatus = localStorage.getItem('isLogined')
    if(loginstatus == 'true'){
      console.log('login True')
      return true
    }
    else{
      console.log('login False')
      return false
    }
  }

  public logout(){
    localStorage.removeItem('username')
    localStorage.removeItem('email')
    localStorage.setItem('isLogined', "false")
  }

}
