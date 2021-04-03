import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Student } from '../model/student';
import { Observable } from 'rxjs';

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

export class StudentService {

  public server:string;

  constructor(
    private http: HttpClient,
    private serverServe: ServerService
  ) {
    this.server = this.serverServe.getBackendService()
  }

  public getRegStudents(cno: string): Observable<Student[]>{
    console.log('get Student ', cno)

    return this.http.get<Student[]>(this.server + `/getRegStudents/${cno}`, httpOptions)
  }

  public getStudents(examId:number): Observable<Student[]>{
    console.log('get student ',examId)

    return this.http.get<Student[]>(this.server + `/getStudent/${examId}`, httpOptions)
  }


}
