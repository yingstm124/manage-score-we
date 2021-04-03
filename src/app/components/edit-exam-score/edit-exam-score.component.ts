import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ExamService } from '../../service/exam.service';

@Component({
  selector: 'app-edit-exam-score',
  templateUrl: './edit-exam-score.component.html',
  styleUrls: ['./edit-exam-score.component.css']
})
export class EditExamScoreComponent implements OnInit {

  public examId: number
  public examName: string
  public stdId: string
  public courseId: string
  public courseName: string
  public term: number
  public year: number

  

  public editExamScoreForm = this.formBuilder.group({
    'score': new FormControl('',[Validators.required, Validators.min(0), Validators.max(100)])
  })

  constructor(
    private router: Router,
    private ActiRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private examServe: ExamService
  ) {
    this.examName = String(this.ActiRouter.snapshot.paramMap.get('name'))
    this.stdId = String(this.ActiRouter.snapshot.paramMap.get('studentId'))
    this.courseName = String(this.ActiRouter.snapshot.paramMap.get('courseName'))
    this.courseId = String(this.ActiRouter.snapshot.paramMap.get('courseId'))
    this.examId = Number(this.ActiRouter.snapshot.paramMap.get('examId'))
    this.term = Number(this.ActiRouter.snapshot.paramMap.get('term'))
    this.year = Number(this.ActiRouter.snapshot.paramMap.get('year'))
  }

  ngOnInit(): void {
  }

  public goExamDetail(){
    this.router.navigate([`examDetail`,this.courseName, this.courseId, String(this.examId), String(this.term), String(this.year), this.examName])
  }

  public submit(){
    let id = this.examId
    let name = this.examName
    let stdId = this.stdId
    let score = this.editExamScoreForm.value.score

    this.examServe.editExamScore(id,name,stdId, score)
    .subscribe(res => {
      if(window.confirm('edit Exam Score')){
        if(res){
          window.alert('edit Exam Score Success')
          this.goExamDetail()
        }
        else{
          window.alert('edit failed')
        }
      }
    })
  }

}
