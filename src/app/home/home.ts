import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { RouterLink } from "@angular/router";
import { Api } from '../services/api';

@Component({
  selector: 'app-home',
  imports: [Header, Footer, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  allRecipes:any = []
  allTestimonials:any=[]

  constructor(private api:Api){}

  ngOnInit(){
    this.getAllRecipes()
    this.getAllAprrovedTestimony()
  }

  getAllAprrovedTestimony(){
    this.api.getApprovedTestimonialsAPI().subscribe((res:any)=>{
      this.allTestimonials=res
      console.log(this.allTestimonials);
      
    })
  }

  getAllRecipes(){
    this.api.getAllRecipesAPI().subscribe((res:any)=>{
      this.allRecipes=res.slice(0,6)
      console.log(this.allRecipes);
      
    })
  }
}
