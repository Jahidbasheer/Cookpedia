import { Component } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-users-list',
  standalone: false,
  templateUrl: './users-list.html',
  styleUrl: './users-list.css',
})
export class UsersList {

  allUsers:any=[]

  constructor(private api:Api){}

  ngOnInit(){
    this.getAllUsers()
  }

  getAllUsers(){
    this.api.getAllUsersAPI().subscribe((res:any)=>{
      this.allUsers=res
      console.log(this.allUsers);
      
    })
  }
}
