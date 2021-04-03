import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../model/user';

import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User

  public registerForm = this.formBuilder.group({
    username: new FormControl('',Validators.required),
    email: new FormControl('', [ Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required)
  })

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userServe: UserService
  ) { }

  ngOnInit(): void {
  }

  submit() {

    console.log('submit')

    let user:User = {
      email: this.registerForm.value.email,
      userName: this.registerForm.value.username,
      password: this.registerForm.value.password,
      firstname: this.registerForm.value.firstname,
      lastname: this.registerForm.value.lastname
    }


    this.userServe.register(user)
    .subscribe(res => {
      console.log(res)
      if(res){
        window.alert('register success !!')
        this.router.navigate(['login'])
      }
      else{
        window.alert('email duplicate')
      }
    })

  }

}
