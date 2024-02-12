import { Component , OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import {env} from '../../environments/environment'
import { Service1Service } from '../service/service1.service';

interface resp{
  host : string
  exists : boolean
  update : boolean
  result : []
}

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.css']
})
export class UrlComponent implements OnInit{
  url : any;
  nickname : any;
  urlerr = new FormControl('',[Validators.required , Validators.pattern('^((https://)|(http://))([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')])
  nameerr = new FormControl('',[Validators.required])
  output : string = ''
  exists : boolean = false
  username : string = ''
  details : any
  update : boolean = false

  ngOnInit(): void {
    this.username = this.serv.getData()
  }
  constructor(private http : HttpClient , private sb : MatSnackBar , private serv : Service1Service){}

  getErrorMessageForURL(){
    if(this.urlerr.hasError('required')){
      return "Cannot be empty"
    }
    return (this.urlerr.hasError('pattern'))?"Invalid URL":"Invalid URL"
  }
  getErrorMessage(){
    if(this.nameerr.hasError('required')){
      return "Cannot be empty"
    }
    return ""
  }
  onClick(){
    const data = {
      username : this.username,
      org_url : this.url,
      nickname : this.nickname
    }
    return this.http.post<resp>(env.BACKEND_URL+"url",data).subscribe(response=>{
      this.output = response['host']
      this.exists = response['exists']
      this.update = response['update']

      if(this.exists == true){
        this.sb.open("Nickname","Already exits",{duration : 5000})
      }else{
        this.sb.open("Nickname","Successfull",{duration : 5000})
      }
    })
  }
  getDetails(){
    this.http.get<resp>(env.BACKEND_URL+this.username).subscribe(response=>{
      this.details = response['result']
    })
  }
}
