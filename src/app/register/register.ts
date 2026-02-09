import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { Api } from '../services/api';
import { routes } from '../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [Footer,ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerForm :FormGroup

  constructor(private fb:FormBuilder,private api:Api,private router:Router){
    this.registerForm=this.fb.group({
      username:["",[Validators.required,Validators.pattern("[a-zA-Z]*")]],
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.pattern("[a-zA-Z0-9]*")]]
    })
  }

  register(){
    if(this.registerForm.valid){
      const username =this.registerForm.value.username
      const email=this.registerForm.value.email
      const password =this.registerForm.value.password
      // api call
      this.api.registerAPI({username,email,password}).subscribe({
        next:(res:any)=>{
          alert(`Welcome ${res.username}, Please Login!!!`)
          this.router.navigateByUrl("/login")
          this.registerForm.reset()
        },
        error:(reason:any)=>{
          alert(reason.error)
          this.registerForm.reset()
        }
      })
    }else{
      alert("Invalid Form!!!")
    }
  }
}
