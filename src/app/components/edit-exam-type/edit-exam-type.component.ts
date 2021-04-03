import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ExamType } from '../../model/examType';
import { ExamService } from '../../service/exam.service';

@Component({
  selector: 'app-edit-exam-type',
  templateUrl: './edit-exam-type.component.html',
  styleUrls: ['./edit-exam-type.component.css']
})
export class EditExamTypeComponent implements OnInit {

  public examId: number
  public examName: string
  public courseId: string
  public courseName: string
  public term: number
  public year: number

  public examTypes: ExamType

  public editExamTypeForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    score: new FormControl('', [Validators.min(0), Validators.max(100), Validators.required])
  })

  constructor(
    private router: Router,
    private ActiRouter: ActivatedRoute,
    private examService: ExamService,
    private formBuilder: FormBuilder
  ) {
    this.examName = String(this.ActiRouter.snapshot.paramMap.get('name'))
    this.courseName = String(this.ActiRouter.snapshot.paramMap.get('courseName'))
    this.courseId = String(this.ActiRouter.snapshot.paramMap.get('courseId'))
    this.examId = Number(this.ActiRouter.snapshot.paramMap.get('examId'))
    this.term = Number(this.ActiRouter.snapshot.paramMap.get('term'))
    this.year = Number(this.ActiRouter.snapshot.paramMap.get('year'))

  }

  ngOnInit(): void {
    this.getExamType()
  }

  public getExamType(){
    this.examService.getExamType(this.examId, this.examName)
    .subscribe(val => {
      this.editExamTypeForm.setValue({
        'name': val.name,
        'score': val.score
      })

    })
  }

  public gotoCourseDetail(){
    this.router.navigate([`courseDetail`,this.courseName, this.courseId, String(this.examId), String(this.term), String(this.year)])
  }

  public submit(){
    let id = this.examId
    let name = this.editExamTypeForm.value.name
    let score = this.editExamTypeForm.value.score

    console.log(id, score, name)

    if(window.confirm('confirm edit')){
      this.examService.editExamType(id, score, name)
      .subscribe(res => {
        if(res){
          window.alert('edit success')
          this.router.navigate([`courseDetail`,this.courseName, this.courseId, String(this.examId), String(this.term), String(this.year)])
        }
        else{
          window.alert('edit failed')
        }
      })
    }

  }

}
