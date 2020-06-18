import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cenovnik } from './Cenovnik';
import { CenovnikService } from './cenovnik.service';





@Component({

  templateUrl: './lista-cenovnika.html'

})

export class ListaCenovnikaComponent implements OnInit {

  cenovnici: Cenovnik[] = [];


  constructor(private route: ActivatedRoute, private router: Router, private cenovnikService: CenovnikService) {


  }
  ngOnInit(): void {
    this.cenovnikService.vratiSveCenovnike().subscribe(
      cenovnici => {
        this.cenovnici = cenovnici;
      }
    );
  }




}