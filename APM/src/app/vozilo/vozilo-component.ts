import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vozilo } from './Vozilo';
import { VoziloSerivces } from './vozilo.service';
import { Slika } from './Slika';

import { HttpClient, HttpEventType } from '@angular/common/http';

import { Cenovnik } from '../cenovnik/Cenovnik';
import { CenovnikService } from '../cenovnik/cenovnik.service';
import { CenovnikComponent } from '../cenovnik/cenovnik.component';
import { ZahtevSerivces } from '../zahtev/zahtev.services';



@Component({

  templateUrl: './vozilo.html'

})

export class VoziloComponent implements OnInit{

  vozilo: Vozilo;
  vozilo1: Vozilo;
  selectedFiles: File[] = [];
  urls = new Array<string>();
  uploadedDatas: FormData[] = [];
  slika: Slika;
  cenovnici: Cenovnik[]=[];


  selectedFile: File;

  retrievedImage: any;

  message: string;

  url : string;

  mejlUlogovanog: string = '';

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router, private voziloService: VoziloSerivces, private cenovnikService: CenovnikService, private zahtevService: ZahtevSerivces) {
    this.vozilo = new Vozilo();
    this.slika = new Slika();


  }

  ngOnInit(){
    this.cenovnikService.vratiSveCenovnike().subscribe({
      next: cenovnici => {
        this.cenovnici = cenovnici;
      }
    });
    console.log(this.cenovnici);

//     this.zahtevService.getMailUlogovanog().subscribe({
//       next: meil => {
//         /*this.mejlUlogovanog = this.mejlUlogovanog.concat(meil)

//         console.log("U next: MAIL::" + meil);
//         console.log("U next:" + this.mejlUlogovanog);
// */
//         this.mejlUlogovanog = meil;
//         console.log("U next: MAIL::" + meil);
//         console.log("U next:" + this.mejlUlogovanog);
//       }
//     })

  }



  napraviOglas() {
    
    console.log("Pravi vozilo::" + this.vozilo)

    this.vozilo.iznajmljivacId = 1;

    this.vozilo.iznajmljivacMail = "agent@gmail.com";

    this.vozilo.pomId = 0;
    console.log("Pravi vozilo::" + this.vozilo)
    console.log("Mejl je::" + this.vozilo.iznajmljivacMail)
    console.log("Mejl je::" + this.mejlUlogovanog)

    this.voziloService.sacuvajVozilo(this.vozilo).subscribe(vozilo => {
      this.vozilo = vozilo;
      this.slika.idVozila = this.vozilo.id;
      this.slika.putanja = this.urls;

      

      console.log(this.selectedFile);
      console.log("vozilo id: " + this.vozilo.id);
      const uploadImageData = new FormData();
      console.log("usao");
      console.log(this.selectedFile);
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name.concat("_vozilo" + this.vozilo.id.toString(10)));
      console.log(this.selectedFile);
      this.httpClient.post('https://localhost:8443/api/vozilo/upload', uploadImageData, { observe: 'response' })

        .subscribe((response) => {

          if (response.status === 200) {

            this.message = 'Image uploaded successfully';

          } else {

            this.message = 'Image not uploaded successfully';
          }
        }
        );
    

    });
    

  }

  public onFileChanged(event) {
    
        this.selectedFile = event.target.files[0];
       
  }



  public detectFiles(event) {
    this.urls = [];

    this.selectedFiles = event.target.files;
    /*for(let file of this.selectedFiles){
         const uploadImageData = new FormData();
         uploadImageData.append('imgs',file);
        this.uploadedDatas.push(uploadImageData);
       }
     */
    console.log(this.selectedFiles);
    if (this.selectedFiles) {
      for (let file of this.selectedFiles) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  }

}
