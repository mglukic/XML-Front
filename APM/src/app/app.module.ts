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



@NgModule({
  declarations: [
    AppComponent,
    VoziloComponent,
    ListaVozilaComponent,
    DetaljiOglasaComponent,
    IzvestajComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // AppRoutingModule,

    RouterModule.forRoot([
      { path: 'vozilo', component: VoziloComponent },
      { path: 'izvestaj', component: IzvestajComponent },
      { path: 'listaVozila', component: ListaVozilaComponent },
      {
        path: 'listaVozila/:id',
        //canActivate: [ProductDetailGuard],
        component: DetaljiOglasaComponent
      }

    ]),
    FormsModule
  ],
  providers: [VoziloSerivces],
  bootstrap: [AppComponent]
})
export class AppModule { }
