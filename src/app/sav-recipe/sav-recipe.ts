import { Component } from '@angular/core';
import { Api } from '../services/api';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-sav-recipe',
  imports: [Header, Footer, RouterLink],
  templateUrl: './sav-recipe.html',
  styleUrl: './sav-recipe.css',
})
export class SavRecipe {

  allRecipe:any=[]

  constructor(private api:Api){}

  ngOnInit(){
    this.getAllRecipe()
  }

  getAllRecipe(){
    this.api.getUserSavedRecipeAPI().subscribe((res:any)=>{
      this.allRecipe=res
      console.log(this.allRecipe);
      
    })
  }

  removeRecipe(id:string){
    this.api.deleteUserSavedRecipeAPI(id).subscribe((res:any)=>{
      this.allRecipe=res
      this.getAllRecipe()
    })
  }
}
