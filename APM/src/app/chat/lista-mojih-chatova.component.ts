import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from './Chat';
import { ChatPrikazLista } from './ChatPrikazLista';
import { ChatService } from './chat.service';
import { ZahtevSerivces } from '../zahtev/zahtev.services';
import { HttpClient } from '@angular/common/http';
//import { Korisnik } from 'src/app/login/Korisnik';
//import { KorisnikService } from 'src/app/admin/lista-korisnika/korisnici.services';

@Component({

  templateUrl: './lista-mojih-chatova.html'

})

export class ListaMojihChatovaComponent implements OnInit {

  myChats: Chat[] = [];
  myChatsPrikaz: ChatPrikazLista[] = [];
  // korisnik: Korisnik;
  emailKorisnika: string;


  constructor(private httpClient: HttpClient,private route: ActivatedRoute, private router: Router, private chatService: ChatService,
    private zahtevService: ZahtevSerivces) {


  }

  ngOnInit(): void {

  
        
        this.chatService.VratiChat().subscribe({
          next: chats => {
            this.myChats = chats;
    
            this.myChats.forEach(element => {
              let userEmail;
    
             /* if (element.user1.valueOf() == this.myChats.) {
                userEmail = element.user2;
              } else {
                userEmail = element.user1;
              }*/
    
              let c = new ChatPrikazLista(element.id, element.user2);
              this.myChatsPrikaz.push(c);
            })
            console.log(this.myChatsPrikaz);
          }
    
        });

 

    

  }

}