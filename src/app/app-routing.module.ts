import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CourseComponent } from './components/course/course.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { StudentComponent } from './components/student/student.component';
import { AddExamComponent } from './components/add-exam/add-exam.component';
import { ExamDetailComponent } from './components/exam-detail/exam-detail.component';
import { EditExamTypeComponent } from './components/edit-exam-type/edit-exam-type.component';
import { EditExamScoreComponent } from './components/edit-exam-score/edit-exam-score.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent},
  { path: 'courses', component: CourseComponent },
  { path: 'courseDetail/:courseName/:courseId/:examId/:term/:year', component: CourseDetailComponent },
  { path: 'student', component: StudentComponent },
  { path: 'addExam/:courseName/:courseId/:examId/:term/:year', component: AddExamComponent},
  { path: 'examDetail/:courseName/:courseId/:examId/:term/:year/:name', component: ExamDetailComponent },
  { path: 'editExamType/:courseName/:courseId/:examId/:term/:year/:name', component: EditExamTypeComponent },
  { path: 'editExamScore/:courseName/:courseId/:examId/:term/:year/:name/:studentId', component: EditExamScoreComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
