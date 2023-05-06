import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { TarjetaComponent } from 'src/app/shared/components/tarjeta/tarjeta.component';

@Component({
  standalone: true,
  selector: 'app-mejores-jugadores',
  templateUrl: './mejores-jugadores.component.html',
  styleUrls: ['./mejores-jugadores.component.css'],
  imports: [CardComponent, CommonModule, TarjetaComponent],
})
export class MejoresJugadoresComponent implements OnInit {
  titulos: string[];

  constructor() {
    this.titulos = [
      'Puntos',
      'Rebotes',
      'Asistencias',
      'Robos',
      'Tapones',
      'Minutos',
    ];
  }
  ngOnInit(): void {
  }
}
