import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ExamDetail } from '../../model/examDetail';
import { ExamType } from '../../model/examType';

import { ExamService } from '../../service/exam.service';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.css']
})
export class ExamDetailComponent implements OnInit {

  public examId: number
  public examName: string
  public courseId: string
  public courseName: string
  public term: number
  public year: number

  public examDetails: ExamDetail[]
  public examType: ExamType

  constructor(
    private router: Router,
    private ActiRouter: ActivatedRoute,
    private examServe: ExamService
  ) {

    this.examName= String(this.ActiRouter.snapshot.paramMap.get('name'))
    this.courseName = String(this.ActiRouter.snapshot.paramMap.get('courseName'))
    this.courseId = String(this.ActiRouter.snapshot.paramMap.get('courseId'))
    this.examId = Number(this.ActiRouter.snapshot.paramMap.get('examId'))
    this.term = Number(this.ActiRouter.snapshot.paramMap.get('term'))
    this.year = Number(this.ActiRouter.snapshot.paramMap.get('year'))

  }

  ngOnInit(): void {

    this.getExamDetail()

  }

  public getExamDetail(){
    this.examServe.getExamDetail(this.examName, this.examId)
    .toPromise()
    .then(val => {
      this.examDetails = val.map(e => {
        return {
          stdId: e.stdId,
          fname: e.fname,
          lname: e.lname,
          score: e.score,
          statusScan: e.statusScan,
          examTypeNo: e.examTypeNo
        }
      })
    })
    .then(val => {
      this.examServe.getExamType(this.examId, this.examName)
      .subscribe(val => {
        this.examType = val
      })
    })
  }

  public gotoCourseDetail(){
    this.router.navigate(['courseDetail',this.courseName, this.courseId, String(this.examId), String(this.term), String(this.year) ])
  }

  public gotoExamScore(stdId){
    this.router.navigate(['editExamScore',this.courseName, this.courseId, String(this.examId), String(this.term), String(this.year), this.examName, stdId ])
  }


}
