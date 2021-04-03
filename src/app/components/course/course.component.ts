import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Course } from '../../model/course';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  public courses: Course[]

  constructor(
    private courseServe: CourseService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
  }

}
