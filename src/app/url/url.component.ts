import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import {env} from '../../environments/environment'

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.css']
})
export class UrlComponent {
  url : any;
  nickname : any;
  urlerr = new FormControl('',[Validators.required , Validators.pattern('^((https://)|(http://))([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')])
  nameerr = new FormControl('',[Validators.required])
  output : any;
  exists : any;

  constructor(private http : HttpClient , private sb : MatSnackBar){}

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
      username : sessionStorage.getItem('username'),
      url : this.url,
      nickname : this.nickname
    }
    return this.http.post<any>(env.BACKEND_URL+"url",data).subscribe(response=>{
      this.output = response['host']
      this.exists = response['exists']
      if(this.exists == "True"){
        this.sb.open("Nickname","Already exits",{duration : 5000})
      }else{
        this.sb.open("Nickname","Successfull",{duration : 5000})
      }
    })
  }
}
