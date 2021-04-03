import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Course } from '../model/course';

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


export class CourseService {

  public server:string;

  constructor(
    private http: HttpClient,
    private serverServe: ServerService
  ) {
    this.server = this.serverServe.getBackendService()
  }


  public getCourse(email: string): Observable<Course[]>{
    console.log('get Courses')

    return this.http.get<Course[]>(this.server + `/getCourse/${email}`, httpOptions)
  }

  public addCourses(courses:Course[]): Observable<boolean>{
    console.log('add Course')

    // let course_json = courses.map(e => {
    //   return {
    //     'courseId' : e.courseId,
    //     'courseName': e.courseName,
    //     'semesterId': e.semesterId,
    //     'studentId': e.studentId
    //   }
    // })

    console.log(courses)

    return this.http.post<boolean>(this.server + `/addCourses`, courses, httpOptions)
  }

  public removeCourse(courseId:string): Observable<boolean>{
    console.log('remove course')

    return this.http.post<boolean>(this.server + `/removeCourse/${courseId}`, httpOptions)
  }


}
