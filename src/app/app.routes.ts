
import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Login } from './login/login';
import { Register } from './register/register';
import { Recipes } from './recipes/recipes';
import { Profile } from './profile/profile';
import { SavRecipe } from './sav-recipe/sav-recipe';
import { ViewRecipe } from './view-recipe/view-recipe';
import { Pnf } from './pnf/pnf';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

    // lazy loading
    {   
        path:'admin',canActivate:[authGuard],loadChildren:()=>import('./admin/admin-module').then(m=>m.AdminModule)
    },
    {
        path:"",component:Home,title:"Home Page"
    },
    {
        path:"about",component:About,title:"About"
    },
    {
        path:"contact",component:Contact,title:"Contact"
    },
    {
        path:"login",component:Login,title:"Login"
    },
    {
        path:"register",component:Register,title:"Register"
    },
    {
        path:"all-recipe",component:Recipes,title:"All Recipes"
    },
    {
        path:"profile",canActivate:[authGuard],component:Profile,title:"Profile"
    },
    {
        path:"save-recipe",canActivate:[authGuard],component:SavRecipe,title:"Save Recipes"
    },
    // http://localhost:4200/recipe/id/view
    {
        path:"recipe/:id/view",canActivate:[authGuard],component:ViewRecipe,title:"View Recipe"
    },
    {
        path:"**",component:Pnf,title:"Page Not Found"
    }
];
