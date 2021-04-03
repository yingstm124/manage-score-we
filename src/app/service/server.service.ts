import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class ServerService {


  public server;

  constructor() {
    this.server = this.getBackendService()
  }

  public getBackendService():string {
    return 'https://db-score-web.herokuapp.com/api'
  }

}
