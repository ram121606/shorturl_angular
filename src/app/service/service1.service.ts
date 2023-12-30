import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Service1Service {
  username : string = ''
  constructor() { }

  setData(data : string){
    this.username = data
  }

  getData(){
    return this.username;
  }
}
