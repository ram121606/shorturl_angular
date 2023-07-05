import { Component,OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar'
import { env } from '../../environments/environment'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  username : string = '';
  pass : string ='';
  user = new FormControl('',[Validators.required])
  password = new FormControl('',[Validators.required,Validators.minLength(8)])
  hide : boolean = true;
  
  
  constructor(private http : HttpClient , private router : Router , private sb : MatSnackBar){}

  // ngOnInit(): void {
  //   this.hide = true;  
  // }

  getErrorMessageForUsername(){
    if(this.user.hasError('required')){
      return "Usernamecannot be empty"
    }
    return ""
  }

  getErrorMessageForPass(){
    if(this.password.hasError('required')){
      return "Password cannot be empty"
    }else{
      return (this.password.hasError('minlength'))?"Not a valid password":""
    }
  }
  
  onClick(){
    const data = {
      username : this.username,
      password : this.pass
    }
    return this.http.post<any>(env.BACKEND_URL+"login",data).subscribe(response=>{
      if(response['result'] == "True"){
        sessionStorage.setItem('username',this.username);
        // this.res = response['result']
        this.sb.open("Login","Successful",{duration:5000})
        this.router.navigate(['/url'])
      }else{
        this.sb.open("Login","Unsuccessfull",{duration:5000})
      }
    })
  }
}
