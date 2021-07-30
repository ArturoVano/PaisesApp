import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';


@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  termino : string = 'Tokyo'
  hayError: boolean = false;
  paises  : Country[] = [];

  paisesSugeridos  : Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor( private paisService: PaisService ) { }

  buscar( termino: string ) {

    this.hayError = false;
    this.termino = termino;

    // Para que un Observable se dispare, se debe usar subscribe (escuchará los cambios)
    this.paisService.buscarCapital( termino )
      .subscribe( paises => {

        this.paises = paises;

      }, err => {

        this.hayError = true;
        this.paises = [];

      });
  }

  sugerencias( termino:string ) {

    if ( termino.length === 0 ) { return; }

    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarCapital( termino )
      .subscribe( 
        paises => this.paisesSugeridos = paises.splice(0,5),
        err => this.paisesSugeridos = []
      );
  }
}
