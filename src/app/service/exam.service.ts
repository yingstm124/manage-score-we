import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Exam } from '../model/exam';
import { ExamType } from '../model/examType';
import { examScore } from '../model/examScore';
import { Student } from '../model/student';
import { ExamDetail } from '../model/examDetail';

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
export class ExamService {

  public server:string;

  constructor(
    private http: HttpClient,
    private serverServe: ServerService
  ) {
    this.server = this.serverServe.getBackendService()
  }

  public getExams(examId: number): Observable<ExamType[]>{
    console.log('get Exams')
    return this.http.get<ExamType[]>(this.server + `/getExams/${examId}`, httpOptions)
  }

  public getExamType(examId:number, name): Observable<ExamType>{
    return this.http.get<ExamType>(this.server + `/getExamType/${examId}/${name}`, httpOptions)
  }

  public getExamDetail(name:string, id:number): Observable<ExamDetail[]>{
    console.log('get Exam Detail ',id)

    return this.http.get<ExamDetail[]>(this.server + `/getExamDetail/${name}/${id}`, httpOptions)
  }

  public addExamType(examType: ExamType): Observable<Exam>{
    console.log('add ExamType')

    let examType_json = {
      'id': examType.id,
      'score': examType.score,
      'name': examType.name,
      'description': examType.description
    }

    return this.http.post<ExamType>(this.server + '/addExamType', examType_json, httpOptions)
  }

  public editExamType(id, score, name): Observable<boolean>{
    console.log('edit')

    let examType_json = {
      'name': name,
      'score': score
    }

    return this.http.put<boolean>(this.server + `/editExamType/${id}`, examType_json, httpOptions)
  }

  public editExamScore(id, name, stdId, score): Observable<boolean>{
    console.log('edit Exam Score')

    let examScore_json = {
      'score': score
    }

    return this.http.put<boolean>(this.server + `/editExamScore/${id}/${name}/${stdId}`, examScore_json, httpOptions)
  }

  public addExamScore(name:string, id:number, std:Student[]): Observable<examScore>{
    console.log('addExamScore')
    console.log(std)

    let examScore = std.map(e => {
      return {
        'examName': name,
        'examTypeNo': id,
        'stdNum': e.stdNo,
        'score': 0,
        'statusScan': false
      }
    })

    console.log(examScore)

    return this.http.post<examScore>(this.server + `/addExamScore`, examScore, httpOptions)
  }

  public delExamType(id:number,name:string): Observable<ExamType>{
    console.log('del ExamType ',id)

    return this.http.post<ExamType>(this.server + `/delExamType/${id}/${name}`, httpOptions)
  }




}
