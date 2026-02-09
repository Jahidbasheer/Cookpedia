import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api } from '../services/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [Footer,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm :FormGroup

  constructor(private fb:FormBuilder,private api:Api,private router:Router){
    this.loginForm=this.fb.group({
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.pattern("[a-zA-Z0-9]*")]]
    })
  }
  
  login(){
    if(this.loginForm.valid){
      const email=this.loginForm.value.email
      const password=this.loginForm.value.password
      console.log(email,password);
      // 
      this.api.loginAPI({email,password}).subscribe({
        next:(res:any)=>{
          sessionStorage.setItem("user",JSON.stringify(res.existingUser))
          sessionStorage.setItem("token",res.token)
          // call get chart
          this.api.getChartData()
          this.loginForm.reset()
          if(res.existingUser.role =="User"){
            alert("Welcome.. User...")
            this.router.navigateByUrl("/")
          }else{
            alert("Welcome Admin !!!")
            this.router.navigateByUrl("/admin")
          }
        },
        error:(reason:any)=>{
          alert(reason.error)
        }
      })
      
    }
  }
}
