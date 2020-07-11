import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cenovnik } from "./Cenovnik";



@Injectable()
export class CenovnikService{
  
    //private pacijetUrl:string;

    constructor(private http:HttpClient){
      
    }

    public vratiCenovnik(id:number):Observable<Cenovnik>{
        return this.http.get<Cenovnik>("/api/cenovnik/"+id);
    }

    public vratiCenovnikPoNazivu(naziv: string):Observable<Cenovnik>{
        return this.http.get<Cenovnik>("/api/cenovnik/poNazivu/" + naziv);
    }

    public obrisiCenovnik(id:number){
        return this.http.delete("/api/cenovnik/"+id);
    }

    public napraviCenovnik(cenovnik:Cenovnik){
        return this.http.post<Cenovnik>("/api/cenovnik/",cenovnik);
    }

    public vratiSveCenovnike(): Observable<Cenovnik[]> {
        return this.http.get<Cenovnik[]>("/api/cenovnik/");
    }

}