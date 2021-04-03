import { Component } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'manage-score-web';

  public isLogined:boolean

  constructor(
    private authServe: AuthenticationService,
    private router: Router
  ){
  }

  ngOnInit() {
  
  }

  public logout(){
    this.authServe.logout()
    console.log('logout success !!')
    window.confirm('logout success !!')
    this.router.navigate(['login'])
  }
}






