import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar'
import { env } from '../../environments/environment'
import { Service1Service } from '../service/service1.service';

interface resp{
  result : boolean
}

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
  
  
  constructor(private http : HttpClient , private router : Router , private sb : MatSnackBar , private serv : Service1Service){}


  
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
  
  async onClick(){
    const data = {
      username : this.username,
      password : this.pass
    }
    return this.http.post<resp>(env.BACKEND_URL+"login",data).subscribe(response=>{
      console.log(response)
      if(response['result'] == true){
        console.log("if block")
        this.serv.setData(this.username)
        this.sb.open("Login","Successful",{duration:5000})
        this.router.navigate(['/url'])
      }else{
        console.log("else block")
        this.sb.open("Login Unsuccessfull","Username or password is invlaid",{duration:5000})
      }
    })
  }
}
