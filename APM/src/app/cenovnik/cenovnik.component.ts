import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Cenovnik } from './Cenovnik';
import { CenovnikService } from './cenovnik.service';

@Component({
    templateUrl: './cenovnik.html',
})
export class CenovnikComponent implements OnInit {

    errorMessage = '';
    cenovnik: Cenovnik;
    id: number;

    constructor(private httpClient: HttpClient,private route: ActivatedRoute, private router: Router, private cenovnikService: CenovnikService) {
        this.cenovnik = new Cenovnik();
    }


    ngOnInit() {
        const param = this.route.snapshot.paramMap.get('id');
        if (param) {
            this.id = +param;
            this.getProduct(this.id);

        }

    }

    getProduct(id: number) {
        this.cenovnikService.vratiCenovnik(id).subscribe(
          cenovnik => this.cenovnik = cenovnik,
          error => this.errorMessage = <any>error
        );
    }

    obrisi(){
        this.cenovnikService.obrisiCenovnik(this.id).subscribe();
        this.router.navigate(['/cenovnik']);
    }


}