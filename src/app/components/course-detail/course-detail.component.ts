import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ExamService } from '../../service/exam.service';
import { StudentService } from '../../service/student.service';

import { ExamType } from '../../model/examType';
import { Student } from '../../model/student';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  public examId: number
  public courseId: string
  public courseName: string
  public term: number
  public year: number

  public exams : ExamType[]
  public students: Student[]
  public notFound = false

  constructor(
    private ActiRouter: ActivatedRoute,
    private router: Router,
    private examServe: ExamService,
    private studentServe: StudentService

  ) {
    this.courseName = String(this.ActiRouter.snapshot.paramMap.get('courseName'))
    this.courseId = String(this.ActiRouter.snapshot.paramMap.get('courseId'))
    this.examId = Number(this.ActiRouter.snapshot.paramMap.get('examId'))
    this.term = Number(this.ActiRouter.snapshot.paramMap.get('term'))
    this.year = Number(this.ActiRouter.snapshot.paramMap.get('year'))
  }

  ngOnInit(): void {

    this.getInfo()
  }

  public getInfo(){

    this.examServe.getExams(this.examId)
    .toPromise()
    .then((val) =>{
      console.log(val)

      if(val.length === 0){
        this.notFound = true
        console.log('not found ',this.notFound)
      }

      this.exams = val.map(e => {
        return {
          id: e.id,
          name: e.name,
          description: e.description,
          score: e.score
        }
      })
    })
    .then( () => {
      this.getStudent()
    })

  }


  public getStudent(){
    console.log(this.courseId)
    this.studentServe.getRegStudents(this.courseId)
    .subscribe(val => {
      this.students = val.map(e => {
        return {
          stdNo: e.stdNo,
          fname: e.fname,
          lname: e.lname
        }
      })
      console.log(val)
    })
  }

  public delExamType(name){

    if(window.confirm('confirm delete')){
      this.examServe.delExamType(this.examId,name)
      .subscribe(res => {
        if(res){
          window.alert('delete Exam Type Success !')
        }
        else{
          window.alert('can not delete')
        }
        this.getInfo()
      })
    }

  }

  public gotoAddExam(){
    this.router.navigate(['/addExam',this.courseName, this.courseId, this.examId, this.term, this.year])
  }

  public gotoExamDetail(name){
    this.router.navigate(['/examDetail',this.courseName, this.courseId, this.examId, this.term, this.year, name])
  }

  public gotoEditExamType(name) {
    this.router.navigate(['/editExamType',this.courseName, this.courseId, this.examId, this.term, this.year, name])
  }

}
