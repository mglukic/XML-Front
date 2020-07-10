import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from "./Report";



@Injectable()
export class ReportsService{
  
    //private pacijetUrl:string;

    constructor(private http:HttpClient){
      
    }

    public vratiIzvestajePoKorisniku(email:String): Observable<Report[]> {
        return this.http.get<Report[]>("/api/report/autor/"+email);
    }

    public napraviCenovnik(rep:Report){
        return this.http.post<Report>("/api/report/",rep);
    }

    public vratiSveCenovnike(): Observable<Report[]> {
        return this.http.get<Report[]>("/api/report/");
    }

}