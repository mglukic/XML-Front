import {Component,NgModule} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vozilo } from './Vozilo';
import {  VoziloSerivces } from './vozilo.service';
import { Slika } from './Slika';





@Component({

    templateUrl : './vozilo.html'

})

export class VoziloComponent{
    
    vozilo: Vozilo;
    vozilo1: Vozilo;
    selectedFiles:File[]=[];
    urls = new Array<string>();
    uploadedDatas:FormData[]=[];
    slika:Slika;
  
    
    
    constructor(private route:ActivatedRoute,private router:Router,private voziloService:VoziloSerivces){
        this.vozilo=new Vozilo();
        this.slika=new Slika();
       
    }

    napraviOglas() {
      
    
     
        this.voziloService.sacuvajVozilo(this.vozilo).subscribe(vozilo => {
          this.vozilo = vozilo;
          console.log(this.selectedFiles);
          this.slika.idVozila=this.vozilo.id;
          this.slika.putanja=this.urls;
          this.voziloService.sacuvajSliku( this.slika).subscribe();
        });
        
       // console.log("vozilo uspesno dodato");
     

      }
      
      detectFiles(event) {
        this.urls = [];
        
        this.selectedFiles = event.target.files;
     /*for(let file of this.selectedFiles){
          const uploadImageData = new FormData();
          uploadImageData.append('imgs',file);
         this.uploadedDatas.push(uploadImageData);
        }
      */
        console.log(this.selectedFiles);
        if ( this.selectedFiles) {
          for (let file of  this.selectedFiles) {
            let reader = new FileReader();
            reader.onload = (e: any) => {
              this.urls.push(e.target.result);
            }
            reader.readAsDataURL(file);
          }
        }
      }

}