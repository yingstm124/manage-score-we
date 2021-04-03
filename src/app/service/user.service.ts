import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from '../model/user';

import { ServerService } from './server.service';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public server:string;

  constructor(
    private http:HttpClient,
    private serveServe: ServerService
  ) {
    this.server = this.serveServe.getBackendService()
  }

  public register(user: User): Observable<boolean>{
    console.log('register user')

    let user_json = {
      'email': user.email,
      'username': user.userName,
      'password': user.password,
      'firstname': user.firstname,
      'lastname': user.firstname
    }

    return this.http.post<boolean>(this.server + `/register`, user_json)
  }

}
