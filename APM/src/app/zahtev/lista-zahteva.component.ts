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

  vozila: Vozilo[] = [];
  podnosilacEmail:string;

  constructor(private zahtevServices: ZahtevSerivces, private chatService: ChatService) { }


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

    this.kreirajChatZaZahtev(ser);
  }

  ponistiZahtev(ser) {

  }

  kreirajChatZaZahtev(zahtev: Zahtev) {

    this.zahtevServices.getPodnosilacEmail(zahtev.podnosilac).subscribe({
      next: podnosilacEmail => {
        this.podnosilacEmail = podnosilacEmail;

        let chat = new Chat();
        chat.user2 = this.mejlUlogovanog;
        chat.user1 = this.podnosilacEmail;
        console.log(chat);
        this.chatService.kreirajChat(chat).subscribe();
        
      }
    });
  }

}

