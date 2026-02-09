import { Component } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {

   allRecipes:any=[]

   searchRecipe:string=""

   constructor(private api:Api){}

   ngOnInit(){
    this.getAllRecipes()
   }

   getAllRecipes(){
    this.api.getAllRecipesAPI().subscribe((res:any)=>{
      this.allRecipes=res
      console.log(this.allRecipes);
      
    })
   }

    deleteRecipe(id:string){
    this.api.deleteRecipeAPI(id).subscribe((res:any)=>{
      alert("Recipe Deleted Successfully")
      this.getAllRecipes()
    })
  }

}
