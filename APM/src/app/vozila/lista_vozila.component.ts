import {Component,NgModule, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vozilo } from '../vozilo/Vozilo';
import { VoziloSerivces } from '../vozilo/vozilo.service';






@Component({

    templateUrl : './lista_vozila.html'

})

export class ListaVozilaComponent implements OnInit{
    
    vozila:Vozilo[]=[];

    
    constructor(private route:ActivatedRoute,private router:Router,private voziloService:VoziloSerivces){
      
       
    }
    ngOnInit(): void {
            this.voziloService.vratiSvaVozila().subscribe(
              vozila => {
                this.vozila = vozila;
              }
            );
          }
    

    

}