import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Api } from '../services/api';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

@Component({
  selector: 'app-view-recipe',
  imports: [Header, Footer, RouterLink],
  templateUrl: './view-recipe.html',
  styleUrl: './view-recipe.css',
})
export class ViewRecipe {

  recipeId: string = ""
  recipe: any = {}
  allRelatedRecipes: any = []

  constructor(private route: ActivatedRoute, private api: Api) { }

  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      console.log(res);
      this.recipeId = res.id
      console.log(this.recipeId);
      this.getRecipe(this.recipeId)

    })
  }

  getRecipe(recipeId: string) {
    this.api.getARecipeAPI(recipeId).subscribe((res: any) => {
      this.recipe = res
      console.log(this.recipe);
      this.getAllRelatedRecipes(res.cuisine)
    })
  }

  getAllRelatedRecipes(cuisine: string) {
    this.api.relatedRecipeAPI(cuisine).subscribe((res: any) => {
      if (res.length > 1) {
        this.allRelatedRecipes = res.filter((item: any) => item.name != this.recipe.name)
        console.log(this.allRelatedRecipes);

      } else {
        this.allRelatedRecipes = []
      }
    })
  }

  generatePDF(){
    const pdf = new jsPDF()
    pdf.setFontSize(16)
    pdf.setTextColor("red")
    pdf.text(this.recipe.name,10,10)
    pdf.setFontSize(12)
    pdf.setTextColor("black")
    pdf.text(`Cuisine : ${this.recipe.cuisine}`,10,20)
    pdf.text(`Servings : ${this.recipe.servings}`,10,25)
    pdf.text(`Mode of Cooking : ${this.recipe.difficulty}`,10,30)
    pdf.text(`Total Prepration Time : ${this.recipe.prepTimeMinutes}`,10,35)
    pdf.text(`Total Cooking Time : ${this.recipe.cookTimeMinutes}`,10,40)
    pdf.text(`Calories Per Serving : ${this.recipe.caloriesPerServing}`,10,45)
    let head = [['Ingredients Needed','Cooking Instructions']]
    let body = []
    body.push([this.recipe.ingredients,this.recipe.instructions])
    autoTable(pdf,{head,body,startY:50})
    pdf.output('dataurlnewwindow')
    pdf.save(`${this.recipe.name}.pdf`)
  }

  downloadRecipe(){
    this.api.downloadRecipeAPI(this.recipeId,this.recipe).subscribe((res:any)=>{
      // call get chart
      this.api.getChartData()
      this.generatePDF()
    })
  }

  saveRecipe(){
    this.api.saveRecipeAPI(this.recipeId,this.recipe).subscribe({
      next:(res:any)=>{
        alert("Recipe Added to your Collection")
      },
      error:(reason:any)=>{
        alert(reason.error)
      }
    })
  }
}
