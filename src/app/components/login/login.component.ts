import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public loginForm = this.formBuilder.group({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authServe: AuthenticationService
  ) {
  }

  ngOnInit(): void {
  }

  public submit(){
    let email = this.loginForm.value.email
    let password = this.loginForm.value.password

    this.authServe.login(email, password)
    .subscribe(val => {

      if(val == null){
        window.alert('Not Found User')
      }
      else if(val.password != password){
        window.alert('password incorrect')
      }
      else {
        window.alert('welcome scan score')
        this.router.navigate([''])
      }

    })

  }

}
