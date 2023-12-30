import { Component , OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import {env} from '../../environments/environment'
import { Service1Service } from '../service/service1.service';

interface resp{
  host : string
  exists : string
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
  output : any;
  exists : any;
  username : string = ''
  details : any;

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
      return "Cannot br empty"
    }
    return ""
  }
  onClick(){
    const data = {
      username : this.username,
      url : this.url,
      nickname : this.nickname
    }
    return this.http.post<resp>(env.BACKEND_URL+"url",data).subscribe(response=>{
      this.output = response['host']
      this.exists = response['exists']
      if(this.exists == "True"){
        this.sb.open("Nickname","Already exits",{duration : 5000})
      }else{
        this.sb.open("Nickname","Successfull",{duration : 5000})
      }
    })
  }
  getDetails(){
    this.http.get<any>(env.BACKEND_URL+"details/"+this.username).subscribe(response=>{
      this.details = response['result']
    })
  }
}
