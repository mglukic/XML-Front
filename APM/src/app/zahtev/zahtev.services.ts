import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zahtev } from "./Zahtev";




@Injectable()
export class ZahtevSerivces {
    
    public getPodnosilacEmail(idPodnosilac:number): Observable<string> {
        return this.http.get<string>("/api/zahtev/getByPodnosilacEmail/" + idPodnosilac);
    }

    constructor(private http: HttpClient) {
    }

    public vratiZahtevePoKorisnikuMail(): Observable<Zahtev[]> {
        return this.http.get<Zahtev[]>("http://localhost:8080/car/zahtev/izdavalacMailAG/");
    }

    // public odobriZahtev(zahtev: ZahtevRezervacije): Observable<ZahtevRezervacije> {
    //   return this.http.post<ZahtevRezervacije>("/zahtev/odobri/" + zahtev.id, zahtev);
    // }
    // public otkaziZahtev(zahtev: ZahtevRezervacije): Observable<ZahtevRezervacije> {
    //   return this.http.post<ZahtevRezervacije>("/zahtev/otkazi/" + zahtev.id, zahtev);
    // }

    public getMailUlogovanog(): Observable<string> {
        //const options = { responseType: 'text', headers };
        //return this.http.get(url, options);
        return this.http.get<string>("http://localhost:8080/user/getMailAgent");
    }

    public odobriZahtev(zahtev: Zahtev): Observable<string> {
        return this.http.get<string>("http://localhost:8080/car/odobriAG/" + zahtev.id);
    }

    public odbaciZahtev(zahtev: Zahtev): Observable<string> {
        return this.http.get<string>("http://localhost:8080/car/odbaciAG/" + zahtev.id);
    }







}