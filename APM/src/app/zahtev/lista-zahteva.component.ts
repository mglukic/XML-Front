import { Component, OnInit } from '@angular/core';
import { Zahtev } from './Zahtev';
import { ZahtevSerivces } from './zahtev.services';
import { Vozilo } from '../vozilo/Vozilo';
import { Chat } from '../chat/Chat';
import { ChatService } from '../chat/chat.service';

@Component({
  selector: 'pm-lista-zahteva',
  templateUrl: './lista-zahteva.component.html',
  styleUrls: ['./lista-zahteva.component.css']
})
export class ListaZahtevaComponent implements OnInit {

  zahtevi: Zahtev[] = [];
  mejlUlogovanog: string = "";
  zahtev:Zahtev;

  vozila: Vozilo[] = [];
  podnosilacEmail:string;
  chat:Chat;

  constructor(private zahtevServices: ZahtevSerivces, private chatService: ChatService) {
    this.zahtev=new Zahtev();
   this.chat=new Chat();
   }


  ngOnInit() {
    

    this.zahtevServices.getMailUlogovanog().subscribe({
      next: mejl => {
        this.mejlUlogovanog = mejl;
        
       /* this.zahtevServices.vratiZahtevePoKorisnikuMail(this.mejlUlogovanog).subscribe({
          next: zahtevi => {
            this.zahtevi = zahtevi;
            for (let z of this.zahtevi) {
              for (let v of z.vozila) {
                this.vozila.push(v);
              }
            }
          }
        })*/
      }
    })
    console.log('Mejl ulogovanog je: ', this.mejlUlogovanog)

    this.zahtev.id=1;
  this.zahtev.datumDo=null;
  this.zahtev.datumOd=null;
  this.zahtev.stanje="PENDING";
  this.zahtev.vozila=[];
  this.zahtev.vremeOdobrenja=null;
  this.zahtev.vremeKreiranja=null;
  this.zahtev.izdavacMail=this.mejlUlogovanog;
  this.zahtev.podnosilac=1;
  this.zahtev.izdavac=2;
  console.log('Zahtev je: ', this.zahtev);
  this.zahtevi.push(this.zahtev);
  console.log('Zahtevi je: ', this.zahtevi);
  
  }

  odobriZahtev(ser) {

    this.kreirajChatZaZahtev(ser);
  }

  ponistiZahtev(ser) {

  }

  kreirajChatZaZahtev(zahtev: Zahtev) {

  
        this.chatService.kreirajChat(zahtev.podnosilac).subscribe();
  }

}

