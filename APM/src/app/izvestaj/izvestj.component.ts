import {Component,NgModule, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoziloSerivces } from '../vozilo/vozilo.service';
import { Vozilo } from '../vozilo/Vozilo';






@Component({

    templateUrl : './izvestaj.html'

})

export class IzvestajComponent implements OnInit{
    tipovi:string[];
    vozila:Vozilo[];
    boolOcena:boolean=false;
    boolKilometri:boolean=false;
    boolKomentar:boolean=false;


    constructor(private route:ActivatedRoute,private router:Router,private voziloService:VoziloSerivces){
       
       
    }
    ngOnInit(): void {
        this.tipovi=["KILOMETRAZA","OCENA","KOMENTARI"];
    }
  
    sortiraj(izabranaVstaIzvestaja:string):void{
        if(izabranaVstaIzvestaja=="KILOMETRAZA"){
            this.boolKilometri=true;
        }
        if(izabranaVstaIzvestaja=="KOMENTARI"){
            this.boolKomentar=true;
        }
       /* if(izabranaVstaIzvestaja=="OCENA"){
            this.boolOcena=true;
        }
        */

        this.voziloService.sortiraj(izabranaVstaIzvestaja).subscribe(vozila => {
            this.vozila = vozila;
            console.log(this.vozila);
          });
    }

}