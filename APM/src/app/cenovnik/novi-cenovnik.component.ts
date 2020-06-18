import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Cenovnik } from './Cenovnik';
import { CenovnikService } from './cenovnik.service';

@Component({
    templateUrl: 'novi-cenovnik.html',
})
export class NoviCenovnikComponent {

    errorMessage = '';
    cenovnik: Cenovnik;
    id: number;

    constructor(private route: ActivatedRoute, private router: Router, private cenovnikService: CenovnikService) {
        this.cenovnik = new Cenovnik();
    }


    napraviCenovnik() {

        this.cenovnikService.napraviCenovnik(this.cenovnik).subscribe(cenovnik => {
            this.cenovnik = cenovnik;
        });
    }
}