import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Router, RouterLink } from '@angular/router';
import { Api } from '../services/api';
import { SearchPipe } from '../pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [Footer,Header,CommonModule,SearchPipe,FormsModule,NgxPaginationModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes {
 allRecipes:any = []
 dummyAllRecipes:any = []
 cuisineArray:any=[]
 mealTypeArray:any=[]
 searchKey:string=""
 p:number=1

  constructor(private api:Api,private router : Router){}

  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){
    this.api.getAllRecipesAPI().subscribe((res:any)=>{
      this.allRecipes=res
      this.dummyAllRecipes=this.allRecipes
      console.log(this.allRecipes);
      this.allRecipes.forEach((item:any) => {
        !this.cuisineArray.includes(item.cuisine)&& this.cuisineArray.push(item.cuisine)
      });
      console.log(this.cuisineArray);
      const dummyMeal =this.allRecipes.map((item:any)=>item.mealType)
      console.log(dummyMeal.flat(Infinity));
      const flatDummyMeal= dummyMeal.flat(Infinity)
      flatDummyMeal.forEach((item:any)=>{
        !this.mealTypeArray.includes(item)&& this.mealTypeArray.push(item)
      })
      console.log(this.mealTypeArray);
      
      
      
    })
  }

  filterRecipe(key:string,value:string){
    this.allRecipes=this.dummyAllRecipes.filter((item:any)=>item[key].includes(value))
  }

  viewRecipe(recipeId:string){
    if(sessionStorage.getItem('token')){
      this.router.navigateByUrl(`recipe/${recipeId}/view`)
    }else{
      alert("Please login for full access")
    }
  }
}
