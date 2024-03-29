import { Component,OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar'
import {env} from '../../environments/environment'

interface resp{
  result : boolean
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  username : any;
  pass : any;
  user = new FormControl('',[Validators.required])
  password = new FormControl('',[Validators.required,Validators.minLength(8)])
  hide : any;
  resp : boolean = false;

  constructor(private http : HttpClient , private router : Router , private sb : MatSnackBar){}

  ngOnInit(): void {
    this.hide = true;  
  }

  getErrorMessageForUsername(){
    if(this.user.hasError('required')){
      return "Username cannot be empty"
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
    return this.http.post<resp>(env.BACKEND_URL+"register",data).subscribe(response=>{
      this.resp = response['result']
      if(this.resp == true){
        this.sb.open("Signup Unsuccessful","Username or password exists",{duration:5000})
      }else{
        this.sb.open("Signup","Successful",{duration:5000})
        this.router.navigate(['/'])
      }
    })
  }

}

