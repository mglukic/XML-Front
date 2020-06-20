import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vozilo } from '../vozilo/Vozilo';
import { VoziloSerivces } from '../vozilo/vozilo.service';
import { Komentar } from './Kometar';
import { Zauzece } from './Zauzece';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ImageResponse } from './ImageResponse';

@Component({
  templateUrl: './detalji-oglasa.html',
})
export class DetaljiOglasaComponent implements OnInit {

  errorMessage = '';
  vozilo: Vozilo;
  id: number;
  komentari: Komentar[] = [];
  komentr: Komentar;
  _tekstKomentar: string;
  _zauzmiOd: Date;
  _zauzmiDo: Date;
  prikazanKomentre: boolean = false;
  zauzmiVozilo: boolean = false;
  zauzece: Zauzece;


  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  imageResponse: ImageResponse[] = [];

  get tekstKomentar(): string {
    return this._tekstKomentar;
  }

  set tekstKomentar(value: string) {
    this._tekstKomentar = value;
  }


  get zauzmiOd(): Date {
    return this._zauzmiOd;
  }

  set zauzmiOd(value: Date) {
    this._zauzmiOd = value;
  }

  get zauzmiDo(): Date {
    return this._zauzmiDo;
  }

  set zauzmiDo(value: Date) {
    this._zauzmiDo = value;
  }

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router, private voziloService: VoziloSerivces) {
    this.komentr = new Komentar();
    this.vozilo = new Vozilo();
    this.zauzece = new Zauzece();
  }


  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      this.id = +param;
      this.getProduct(this.id);

    }

  }






  getProduct(id: number) {
    this.voziloService.vratiVozilo(id).subscribe(
      vozilo => this.vozilo = vozilo,
      error => this.errorMessage = <any>error
    );

    this.httpClient.get('http://localhost:8090/api/vozilo/getImage/' + this.id)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;

        }

      );


    /* pokusaj za vise slika ai ne radi
        this.httpClient.get('http://localhost:8080/api/vozilo/getImages/' + this.id)
        this.voziloService.getImages(this.id).subscribe
          (
            imageResponse => {
              this.imageResponse = imageResponse;
    
              for (let i = 0; i < this.imageResponse.length; i++) {
    
    
                console.log("this.imageResponse[", i, "] ", this.imageResponse[i])
                //this.base64Data = this.imageResponse[i].picByte;
                //this.retrievedImage[i] = 'data:image/jpeg;base64,' + this.base64Data;
                //this.retrievedImage.push('data:image/jpeg;base64,' + this.base64Data);
    
                let reader = new FileReader();
                reader.onload = (e: any) => { this.retrievedImage.push(e.target.result); }
                if (event.target.files[0]) {
                  reader.readAsDataURL(this.imageResponse[i].picByte);
                }
    
              }
    
    
    
              //this.retrieveResonse = res;
              //this.base64Data = this.retrieveResonse.picByte;
              //this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
            }
    
          );
    
    */
  }

  onBack(): void {
    this.router.navigate(['/listaVozila']);
  }
  kometarDodaj() {
    this.komentr.idVozila = this.id;
    this.komentr.komentar = this.tekstKomentar;
    this.voziloService.dodajKomentar(this.komentr).subscribe();

  }
  prikaziKomentare() {
    this.prikazanKomentre = true;
    this.listaKomentara();
  }
  listaKomentara() {
    this.voziloService.vratiKomentareVozila(this.id).subscribe(
      komentari => {
        this.komentari = komentari;
      }
    );
  }
  prikaziRezervaciju() {
    this.zauzmiVozilo = true;
  }
  rezervisi() {
    this.zauzece.zauzetOd = this.zauzmiOd;
    this.zauzece.zauzetDo = this.zauzmiDo;
    this.zauzece.idVozila = this.id;
    this.voziloService.rezervisiVozilo(this.zauzece).subscribe();

  }
}