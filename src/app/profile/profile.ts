import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Api } from '../services/api';

@Component({
  selector: 'app-profile',
  imports: [Header,Footer],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  profileImage:string="https://cdn-icons-png.flaticon.com/512/711/711128.png"

  allDownloads:any=[]

  constructor(private api:Api){}

  ngOnInit(){
    this.getAllDownload()
    const user =JSON.parse(sessionStorage.getItem("user")||"")
    if(user.profilePic){
      this.profileImage=user.profilePic
    }
  }

  getAllDownload(){
    this.api.getUserDownloadRecipeAPI().subscribe((res:any)=>{
      this.allDownloads=res
      console.log(this.allDownloads);
      
    })
  }

  getFile(event:any){
    let uploadFile=event.target.files[0]
    // convert file to URL
    let fr = new FileReader()
    fr.readAsDataURL(uploadFile)
    fr.onload = (event:any)=>{
      console.log(event.target.result);
      this.profileImage=event.target.result
      
    }
  }

  updateProfile(){
    this.api.editUserAPI({profilePic:this.profileImage}).subscribe((res:any)=>{
      sessionStorage.setItem("user",JSON.stringify(res))
      this.profileImage=res.profilePic
      alert("Profile Updated....")
    })
  }

}
