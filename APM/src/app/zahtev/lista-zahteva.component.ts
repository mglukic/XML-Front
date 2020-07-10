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

    this.zahtevServices.vratiZahtevePoKorisnikuMail().subscribe({
      next: zahtevi => {
        console.log('usao u next!');
        this.zahtevi = zahtevi;
        for (let z of this.zahtevi) {
          for (let v of z.vozila) {
            this.vozila.push(v);
          }
        }
      }, 
      error: data => {
        console.log('U erroru: data: .. ', data)
        this.zahtevi = data;

    

    this.zahtevServices.getMailUlogovanog().subscribe({
      next: mejl => {
        this.mejlUlogovanog = mejl;
        

      }
      
    })

  }


  odobriZahtev(zahtev: Zahtev) {
    //this.kreirajChatZaZahtev(zahtev);
    this.zahtevServices.odobriZahtev(zahtev).subscribe();  

    this.kreirajChatZaZahtev(zahtev);

  }


  ponistiZahtev(zahtev: Zahtev) {
    this.zahtevServices.odbaciZahtev(zahtev).subscribe();
  }

  kreirajChatZaZahtev(zahtev: Zahtev) {

  
        this.chatService.kreirajChat(zahtev.podnosilac).subscribe();
  }

  // kreirajChatZaZahtev(zahtev: ZahtevRezervacije) {

  //   this.login.getKorisnikeSve().subscribe({
  //     next: korisnici => {
  //       this.korisnici = korisnici;

  //       for (let i = 0; i < this.korisnici.length; i++) {
  //         if (this.korisnici[i].id == zahtev.podnosilac) {
  //           this.podnosilac = this.korisnici[i];
  //         }
  //       }
  //       let chat = new Chat();
  //       chat.user2 = zahtev.izdavacMail;
  //       chat.user1 = this.podnosilac.email;
  //       console.log(chat);
  //       this.chatService.kreirajChat(chat).subscribe();
        
  //     }
  //   });
  // }


}

