import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Report } from './Report';
import { ReportsService } from './reports.service';





@Component({

  templateUrl: './allReports.html'

})

export class AllReports implements OnInit {

  izvestaji: Report[] = [];


  constructor(private route: ActivatedRoute, private router: Router, private reportsService: ReportsService) {


  }
  ngOnInit(): void {
    this.reportsService.vratiIzvestajePoKorisniku("temp").subscribe(
        izvestaji => {
        this.izvestaji = izvestaji;
      }
    );
  }




}