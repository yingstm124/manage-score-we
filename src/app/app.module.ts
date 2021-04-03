// module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// autocomplete module
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// component
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CourseComponent } from './components/course/course.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { StudentComponent } from './components/student/student.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ExamDetailComponent } from './components/exam-detail/exam-detail.component';
import { AddExamComponent } from './components/add-exam/add-exam.component';
import { EditExamTypeComponent } from './components/edit-exam-type/edit-exam-type.component';
import { EditExamScoreComponent } from './components/edit-exam-score/edit-exam-score.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CourseComponent,
    CourseDetailComponent,
    StudentComponent,
    ExamDetailComponent,
    AddExamComponent,
    EditExamTypeComponent,
    EditExamScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    AutocompleteLibModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
