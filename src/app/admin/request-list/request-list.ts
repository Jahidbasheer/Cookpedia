import { Component } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.html',
  styleUrl: './request-list.css',
})
export class RequestList {

  allTestimonials:any=[]

  constructor(private api:Api){}

  ngOnInit(){
    this.getAllTestimonials()
  }

  getAllTestimonials(){
    this.api.getAllTestimonialsAPI().subscribe((res:any)=>{
      this.allTestimonials=res
      console.log(this.allTestimonials);
      
    })
  }

  updateTestimony(id:string,status:string){
    this.api.updateTestimonyAPI(id,status).subscribe((res:any)=>{
      this.getAllTestimonials()
    })
  }

}
