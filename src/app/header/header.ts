import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isLoggedIn:boolean =false

  loginName:string=""

  constructor(private router:Router){}

  ngOnInit(){
    if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
      this.isLoggedIn=true
      this.loginName=JSON.parse(sessionStorage.getItem("user") ||"").username
    }else{
      this.isLoggedIn=false
      this.loginName=""
    }
  }
  logout(){
    sessionStorage.clear()
    localStorage.clear()
    this.loginName=""
    this.router.navigateByUrl("/")
  }
}
