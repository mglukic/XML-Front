import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';




import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { VoziloComponent } from './vozilo/vozilo-component';
import { VoziloSerivces } from './vozilo/vozilo.service';
import { ListaVozilaComponent } from './vozila/lista_vozila.component';
import { DetaljiOglasaComponent } from './detalji-oglasa/detalji-oglasa.component';
import { IzvestajComponent } from './izvestaj/izvestj.component';
import { CenovnikComponent } from './cenovnik/cenovnik.component';
import { NoviCenovnikComponent } from './cenovnik/novi-cenovnik.component';
import { CenovnikService } from './cenovnik/cenovnik.service';
import { ListaCenovnikaComponent } from './cenovnik/lista-cenovnika.component';
//import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    VoziloComponent,
    ListaVozilaComponent,
    DetaljiOglasaComponent,
    IzvestajComponent,
    CenovnikComponent,
    NoviCenovnikComponent,
    ListaCenovnikaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  //  AppRoutingModule,
    FormsModule,

    RouterModule.forRoot([
      { path: 'vozilo', component: VoziloComponent },
      { path: 'izvestaj', component: IzvestajComponent },
      { path: 'listaVozila', component: ListaVozilaComponent },
      {
        path: 'listaVozila/:id',
        //canActivate: [ProductDetailGuard],
        component: DetaljiOglasaComponent
      },
      { path: 'novi-cenovnik', component: NoviCenovnikComponent },
      { path: 'cenovnik/:id', component: CenovnikComponent },
      { path: 'cenovnik', component: ListaCenovnikaComponent }

    ]),
    FormsModule
  ],
  providers: [VoziloSerivces, CenovnikService],
  bootstrap: [AppComponent]
})
export class AppModule { }
