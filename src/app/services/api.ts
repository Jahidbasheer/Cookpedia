import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeModel } from '../admin/model/recipeModel';

@Injectable({
  providedIn: 'root',
})
export class Api {

  server_url = "https://cookpedia-backend-jg9v.onrender.com"

  constructor(private http: HttpClient) { }

  // get all recipies
  getAllRecipesAPI() {
    return this.http.get(`${this.server_url}/all-recipes`)
  }

  addTestimonyAPI(reqBody: any) {
    return this.http.post(`${this.server_url}/add-testimony`, reqBody)
  }

  registerAPI(reqBody: any) {
    return this.http.post(`${this.server_url}/register`, reqBody)
  }

  loginAPI(reqBody: any) {
    return this.http.post(`${this.server_url}/login`, reqBody)
  }

  appendToken(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem('token')
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`) 
    }
    return {headers}
  }
 
  // get a recipies
   getARecipeAPI(recipeId:string) {
    return this.http.get(`${this.server_url}/recipe/${recipeId}/view`,this.appendToken())
  }

  // get related recipies
   relatedRecipeAPI(cuisine:string) {
    return this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`,this.appendToken())
  }

  // add to download recipies
   downloadRecipeAPI(recipeId:string,reqBody:any) {
    return this.http.post(`${this.server_url}/recipe/${recipeId}/download`,reqBody,this.appendToken())
  }

  // add to save recipies
   saveRecipeAPI(recipeId:string,reqBody:any) {
    return this.http.post(`${this.server_url}/recipe/${recipeId}/save`,reqBody,this.appendToken())
  }

  // /get-user-recipe
   getUserSavedRecipeAPI() {
    return this.http.get(`${this.server_url}/get-user-recipe`,this.appendToken())
  }

  // delete-user-recipe
   deleteUserSavedRecipeAPI(id:string) {
    return this.http.delete(`${this.server_url}/recipe/${id}/remove`,this.appendToken())
  }

    // /get-user-recipe
   getUserDownloadRecipeAPI() {
    return this.http.get(`${this.server_url}/user-downloads`,this.appendToken())
  }

    // /edit-user
   editUserAPI(reqBody:any) {
    return this.http.post(`${this.server_url}/user/edit`,reqBody,this.appendToken())
  }

   // /all-users
   getAllUsersAPI() {
    return this.http.get(`${this.server_url}/all-users`,this.appendToken())
  }

  // /all-downloads
   getAllDownloadAPI() {
    return this.http.get(`${this.server_url}/all-downloads`,this.appendToken())
  }

    // /all-downloads
   getAllTestimonialsAPI() {
    return this.http.get(`${this.server_url}/all-testimonials`,this.appendToken())
  }

    // /approved testimony
   getApprovedTestimonialsAPI() {
    return this.http.get(`${this.server_url}/approved-testimonials`)
  }

  ///testimony/:id/update"
  updateTestimonyAPI(id:string,status:string) {
    return this.http.get(`${this.server_url}/testimony/${id}/update?status=${status}`,this.appendToken())
  }

   //add recipe
  addRecipeAPI(reqBody:any) {
    return this.http.post(`${this.server_url}/add-recipe`,reqBody,this.appendToken())
  }

   //edit recipe
  editRecipeAPI(id:string,reqBody:RecipeModel) {
    return this.http.put(`${this.server_url}/recipe/${id}/edit`,reqBody,this.appendToken())
  }

  //delete recipe
  deleteRecipeAPI(id:string) {
    return this.http.delete(`${this.server_url}/recipe/${id}/delete`,this.appendToken())
  }

  // get chart Data
  getChartData(){
    this.getAllDownloadAPI().subscribe((res:any)=>{
      console.log(res);
      let downloadArrayList:any=[]
      let output:any={}
      res.forEach((item:any) => {
        let cuisine = item.recipeCuisine
        let currentCount =item.count
        if(output.hasOwnProperty(cuisine)){
          output[cuisine]+= currentCount
        }else{
          output[cuisine] = currentCount
        }
        for(let cuisine in output){
          downloadArrayList.push({name:cuisine,y:output[cuisine]})
        }
        localStorage.setItem("chart",JSON.stringify(downloadArrayList))
      });
      
    })
  }




}
