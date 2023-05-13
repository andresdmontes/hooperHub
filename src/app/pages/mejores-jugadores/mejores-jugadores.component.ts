import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Equipo } from 'src/app/interfaces/equipo.interface';
import { SearchService } from 'src/app/services/search.service';
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
  equipos: Equipo[];

  titulos: string[];

  constructor(private equipoService: SearchService) {
    this.equipos = [];
    this.titulos = [
      'Puntos',
      'Rebotes',
      'Asistencias',
      'Robos',
      'Tapones',
      'Minutos',
    ];
  }
  ngOnInit() {
    this.getEquipos();
  }

  getEquipos(): void {
    this.equipoService.obtenerEquiposActivos().subscribe((equipos) => {
      this.equipos = equipos;
    });
  }
}
