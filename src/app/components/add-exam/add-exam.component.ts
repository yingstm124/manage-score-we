import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';

import { ExamType } from '../../model/examType';
import { examScore } from '../../model/examScore';

import { ExamService } from '../../service/exam.service';
import { StudentService } from '../../service/student.service';
import { Student } from 'src/app/model/student';


@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit {

  public examId: number
  public courseId: string
  public courseName: string
  public term: number
  public year: number

  public students: Student[]

  public examInfoForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    score: new FormControl('', [Validators.required, Validators.max(100), Validators.min(0)]),
    description : new FormControl('', [Validators.required])
  })

  constructor(
    private router: Router,
    private ActiRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
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

  }

  public goCourseDetail(){
    this.router.navigate([`courseDetail`,this.courseName, this.courseId, String(this.examId), String(this.term), String(this.year)])
  }

  public submit(){
    let examType: ExamType = {
      id : this.examId,
      name : this.examInfoForm.value.name,
      score : this.examInfoForm.value.score,
      description : this.examInfoForm.value.description
    }

    this.examServe.addExamType(examType)
    .toPromise()
    .then(res => {
      if(res){

        this.studentServe.getStudents(this.examId)
        .toPromise()
        .then(val => {
          this.students = val.map(e => {
            return{
              stdNo: e.stdNo,
              fname: e.fname,
              lname: e.lname
            }
          })
        })
        .then(() => {
          this.examServe.addExamScore(this.examInfoForm.value.name, this.examId, this.students)
          .subscribe(res => {
            if(res){
              this.router.navigate([`courseDetail`,this.courseName, this.courseId, String(this.examId), String(this.term), String(this.year)])
            }
            else{
              window.alert('add Exam Score failed')
            }
          })
        })


      }
      else{
        alert('exam Type name duplicate')
      }
    })
  }






}
