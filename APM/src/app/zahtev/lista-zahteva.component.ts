import { Component, OnInit } from '@angular/core';
import { Zahtev } from './Zahtev';
import { ZahtevSerivces } from './zahtev.services';
import { Vozilo } from '../vozilo/Vozilo';

@Component({
  selector: 'pm-lista-zahteva',
  templateUrl: './lista-zahteva.component.html',
  styleUrls: ['./lista-zahteva.component.css']
})
export class ListaZahtevaComponent implements OnInit {

  zahtevi: Zahtev[] = [];
  mejlUlogovanog: string = "";

  vozila: Vozilo[] = [];

  constructor(private zahtevServices: ZahtevSerivces) { }


  ngOnInit() {
    this.zahtevServices.getMailUlogovanog().subscribe({
      next: mejl => {
        this.mejlUlogovanog = mejl;
        console.log('Mejl ulogovanog je: ', this.mejlUlogovanog)

        this.zahtevServices.vratiZahtevePoKorisnikuMail(this.mejlUlogovanog).subscribe({
          next: zahtevi => {
            this.zahtevi = zahtevi;
            for (let z of this.zahtevi) {
              for (let v of z.vozila) {
                this.vozila.push(v);
              }
            }
          }
        })
      }
    })
  }

  odobriZahtev(ser) {

  }

  ponistiZahtev(ser) {

  }


}

