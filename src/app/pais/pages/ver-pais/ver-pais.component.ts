import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators'

import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';


@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor( 
    private activatedRoute: ActivatedRoute, 
    private paisService: PaisService 
  ) { } // Constructor is before Init

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe( 
        switchMap( ({ id }) => this.paisService.getPaisPorAlpha(id) ),
        tap( console.log ) 
      )
      .subscribe( pais => this.pais = pais );
       
  }

}


// Tap is a rxjs operator that triggers a side effect