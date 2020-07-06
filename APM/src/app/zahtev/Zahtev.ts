import { Vozilo } from "../vozilo/Vozilo";

export class Zahtev {
    id:number;
    vozila:Vozilo[];
    datumOd:Date;
    datumDo:Date;
    izdavac:number;
    izdavacMail:string;
    podnosilac:number;
    stanje:string;
    vremeKreiranja:Date;
    vremeOdobrenja:Date;
}