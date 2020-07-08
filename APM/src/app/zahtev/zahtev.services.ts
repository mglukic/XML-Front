import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zahtev } from "./Zahtev";




@Injectable()
export class ZahtevSerivces {

    constructor(private http: HttpClient) {
    }

    public vratiZahtevePoKorisnikuMail(mail: string): Observable<Zahtev[]> {
        return this.http.get<Zahtev[]>("/api/zahtev/getByIzdavacMail/" + mail);
    }

    // public odobriZahtev(zahtev: ZahtevRezervacije): Observable<ZahtevRezervacije> {
    //   return this.http.post<ZahtevRezervacije>("/zahtev/odobri/" + zahtev.id, zahtev);
    // }
    // public otkaziZahtev(zahtev: ZahtevRezervacije): Observable<ZahtevRezervacije> {
    //   return this.http.post<ZahtevRezervacije>("/zahtev/otkazi/" + zahtev.id, zahtev);
    // }

    public getMailUlogovanog(): Observable<string> {
        return this.http.get<string>("/api/zahtev/getMejlAgenta");
    }





}