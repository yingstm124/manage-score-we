import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { AuthenticationService } from '../../service/authentication.service';
import { CourseService } from '../../service/course.service';

import { Course } from '../../model/course';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public currentUserEmail:string
  public currentUserName:string

  public courseDetails: any[];
  public notFound = false
  public courses : Course[];

  searchCourses;

  constructor(
    private authServe: AuthenticationService,
    private router: Router,
    private courseService: CourseService

  ) {}

  ngOnInit(): void {

    this.currentUserEmail = localStorage.getItem('email')
    this.currentUserName = localStorage.getItem('username')

    if(!this.authServe.isLogined){
      this.router.navigate(['/login'])
    }

    this.getCourse()

  }

  public getCourse(){
    this.courseService.getCourse(this.currentUserEmail)
    .subscribe(val => {


      if(val.length === 0){
        this.notFound = true
      }

      this.courses = val.map( e => {
        return {
          courseId: e.courseId,
          courseName: e.courseName,
          term: e.term,
          year: e.year,
          teacheremail: e.teacheremail,
          exNo: e.exNo
        }
      })


    })
  }

  public gotoCourseDetail( courseName, courseId, examId, term, year){
    this.router.navigate([`courseDetail`,courseName, courseId, String(examId), String(term), String(year)])
  }




}
