import { Component, Input } from '@angular/core';
import { Api } from '../../services/api';
import { RecipeModel } from '../model/recipeModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-recipe',
  standalone: false,
  templateUrl: './manage-recipe.html',
  styleUrl: './manage-recipe.css',
})
export class ManageRecipe {
  @Input() id!: string
  recipeDetails: RecipeModel = {}
  cuisineArray: any = []
  mealTypeArray: any = []
  ingredients: any = []
  instructions: any = []
  mealArray: any = []

  constructor(private api: Api, private router: Router) { }

  ngOnInit() {
    this.getAllRecipes()
  }

  getAllRecipes() {
    this.api.getAllRecipesAPI().subscribe((res: any) => {
      if (this.id) {
        this.recipeDetails = res.find((item: any) => item._id == this.id)
        this.ingredients = this.recipeDetails.ingredients
        this.instructions = this.recipeDetails.instructions
        this.mealArray = this.recipeDetails.mealType
      }

      res.forEach((item: any) => {
        !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)
      });
      console.log(this.cuisineArray);
      const dummyMeal = res.map((item: any) => item.mealType)
      // console.log(dummyMeal.flat(Infinity));
      const flatDummyMeal = dummyMeal.flat(Infinity)
      flatDummyMeal.forEach((item: any) => {
        !this.mealTypeArray.includes(item) && this.mealTypeArray.push(item)
      })
      console.log(this.mealTypeArray);



    })
  }

  addIngredients(ingredientsInput: any) {
    if (ingredientsInput.value) {
      this.ingredients.push(ingredientsInput.value)
      ingredientsInput.value = ""
      console.log(this.ingredients);

    }
  }

  removeIngredient(value: string) {
    this.ingredients = this.ingredients.filter((item: string) => item != value)
  }

  addInstructions(instructionsInput: any) {
    if (instructionsInput.value) {
      this.instructions.push(instructionsInput.value)
      instructionsInput.value = ""
      console.log(this.instructions);

    }
  }

  removeInstructions(value: string) {
    this.instructions = this.instructions.filter((item: string) => item != value)
  }

  mealTypeSelect(event: any) {
    if (event.target.checked) {
      !this.mealArray.includes(event.target.name) && this.mealArray.push(event.target.name)
    } else {
      this.mealArray = this.mealArray.filter((item: string) => item != event.target.name)
    }
    console.log(this.mealArray);

  }

  removeMeal(meal: string) {
    this.mealArray = this.mealArray.filter((item: string) => item != meal)
  }

  addRecipe() {
    console.log(this.recipeDetails);
    this.recipeDetails.ingredients = this.ingredients
    this.recipeDetails.instructions = this.instructions
    this.recipeDetails.mealType = this.mealArray
    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType } = this.recipeDetails
    if (name && ingredients!.length > 0 && instructions!.length > 0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length > 0) {
      this.api.addRecipeAPI(this.recipeDetails).subscribe({
        next: (res: any) => {
          alert("Recipe Added Successfully")
          this.recipeDetails = {}
          this.ingredients = []
          this.instructions = []
          this.mealArray = []
          this.router.navigateByUrl("/admin/recipe-list")
        },
        error: (reason: any) => {
          alert(reason.error)
          this.recipeDetails.name = ""
        }
      })
    } else {
      alert("Please fill the form")
    }

  }

  editRecipe() {
    console.log(this.recipeDetails);
    this.recipeDetails.ingredients = this.ingredients
    this.recipeDetails.instructions = this.instructions
    this.recipeDetails.mealType = this.mealArray
    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType } = this.recipeDetails
    if (name && ingredients!.length > 0 && instructions!.length > 0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length > 0) {
      this.api.editRecipeAPI(this.id, this.recipeDetails).subscribe((res: any) => {
        alert("Recipe Updated Successfully")
        this.recipeDetails = {}
        this.ingredients = []
        this.instructions = []
        this.mealArray = []
        this.router.navigateByUrl("/admin/recipe-list")

      })
    } else {
      alert("Please fill the form")
    }
  }

}
