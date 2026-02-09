import { Component } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-download-list',
  standalone: false,
  templateUrl: './download-list.html',
  styleUrl: './download-list.css',
})
export class DownloadList {

  allDownloads:any = []

  constructor(private api:Api){}

  ngOnInit(){
    this.getAllDownloads()
  }

  getAllDownloads(){
    this.api.getAllDownloadAPI().subscribe((res:any)=>{
      this.allDownloads=res
      console.log(this.allDownloads);
      
    })
  }

}
