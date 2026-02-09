import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Api } from '../../services/api';
import * as Highcharts from 'highcharts'

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  Highcharts: typeof Highcharts = Highcharts
  chartOptions = {}
  selected = new Date()
  isSidebarOpen: boolean = true
  columnWidth: string = "col-lg-10"
  userCount: number = 0
  recipeCount: number = 0
  downloadCount: number = 0
  requestCount: number = 0

  constructor(private router: Router, private api: Api) {
    if (localStorage.getItem("chart")) {
      let chartData = JSON.parse(localStorage.getItem("chart") || "")
      this.chartOptions = {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Analysis of Download Recipes Based on Cuisine',
          align: 'left'
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: 'Total Download Recipe Count'
          }
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        series: [{
          name: 'Cuisine',
          colorByPoint: true,
          type: 'bar',
          data: chartData
        }]
      }
    }

  }

  ngOnInit() {
    this.getUserCount()
    this.getRecipeCount()
    this.getDownloadCount()
    this.getRequestCount()
  }

  getUserCount() {
    this.api.getAllUsersAPI().subscribe((res: any) => {
      this.userCount = res.length
    })
  }

  getRecipeCount() {
    this.api.getAllRecipesAPI().subscribe((res: any) => {
      this.recipeCount = res.length
    })
  }

  getDownloadCount() {
    this.api.getAllDownloadAPI().subscribe((res: any) => {
      this.downloadCount = res.map((item: any) => item.count).reduce((a: any, b: any) => a + b)
    })
  }

  getRequestCount() {
    this.api.getAllTestimonialsAPI().subscribe((res: any) => {
      this.requestCount = res.filter((item: any) => item.status == "Pending").length
    })
  }

  menuBtn() {
    this.isSidebarOpen = !this.isSidebarOpen
    this.columnWidth = "col"
  }

  adminLogout() {
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigateByUrl("/")
  }

}
