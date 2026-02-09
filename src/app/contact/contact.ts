import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { Api } from '../services/api';

@Component({
  selector: 'app-contact',
  imports: [Header,Footer,ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

  testimonyForm : FormGroup

  constructor(private fb:FormBuilder,private api:Api){
    this.testimonyForm=this.fb.group({
      name:["",[Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      email:["",[Validators.required,Validators.email]],
      message:["",[Validators.required,Validators.pattern("[a-zA-Z0-9., ]*")]]
    })
  }

  addTestimony(){
    if(this.testimonyForm.valid){
      const name =this.testimonyForm.value.name
      const email = this.testimonyForm.value.email
      const message = this.testimonyForm.value.message
      this.api.addTestimonyAPI({name,email,message}).subscribe((res:any)=>{
        alert("Thankyou For your testimony!!!")
        this.testimonyForm.reset()
      })
    }else{
      alert("Invalid form")
    }
  }

}
