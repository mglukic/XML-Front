import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vozilo } from "./Vozilo";
import { Komentar } from "../detalji-oglasa/Kometar";
import { Slika } from "./Slika";
import { Zauzece } from "../detalji-oglasa/Zauzece";
import { ImageResponse } from "../detalji-oglasa/ImageResponse";


@Injectable()
export class VoziloSerivces {
  uploadImage(uploadImageData: FormData) {
    return this.http.post<Vozilo>("/api/vozilo/upload", FormData)


  }
  private pacijetUrl: string;

  constructor(private http: HttpClient) {
    //  this.pacijetUrl='http//localhost:8080/api/pacijenti';
  }






  public sacuvajVozilo(vozilo: Vozilo) {
    return this.http.post<Vozilo>("/api/vozilo/add", vozilo);
  }
  public sacuvajSliku(slika: Slika) {
    return this.http.post<Slika>("/api/vozilo/slika", slika);
  }
  public vratiSvaVozila(): Observable<Vozilo[]> {
    return this.http.get<Vozilo[]>("/api/vozilo/vratiSvaVozila");
  }
  public vratiVozilo(id: number): Observable<Vozilo> {
    return this.http.get<Vozilo>("/api/vozilo/listaVozila/" + id);
  }

  public dodajKomentar(komentar: Komentar) {
    return this.http.post<Komentar>("/api/vozilo/dodajKomentar", komentar);
  }
  public vratiKomentareVozila(idVozila: number): Observable<Komentar[]> {
    return this.http.get<Komentar[]>("/api/vozilo/listaVozila/vratiKomentare/" + idVozila);
  }
  public sortiraj(vrstaSortiranja: string): Observable<Vozilo[]> {
    return this.http.get<Vozilo[]>("/api/vozilo/sortiraj/" + vrstaSortiranja);
  }

  public rezervisiVozilo(zauzece: Zauzece) {
    return this.http.post<Zauzece>("/api/vozilo/rezervisi", zauzece);
  }

  public getImages(idVozila: number): Observable<Blob[]> {
    return this.http.get<Blob[]>("/api/vozilo/getImages/" + idVozila);
  }

  public getOcena(idVozila: number): Observable<number> {
    return this.http.get<number>("/api/vozilo/getOcenaByIdVozila/" + idVozila);
  }
}