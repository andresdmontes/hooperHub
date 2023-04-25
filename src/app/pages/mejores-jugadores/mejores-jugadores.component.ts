import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Equipo } from 'src/app/interfaces/equipo.interface';
import { JugadorStats } from 'src/app/interfaces/estadisticas.interface';
import { Jugador } from 'src/app/interfaces/jugador.interface';
import { StatsService } from 'src/app/services/stats.service';
import { CardComponent } from 'src/app/shared/components/card/card.component';

@Component({
  standalone: true,
  selector: 'app-mejores-jugadores',
  templateUrl: './mejores-jugadores.component.html',
  styleUrls: ['./mejores-jugadores.component.css'],
  imports: [CardComponent, CommonModule],
})
export class MejoresJugadoresComponent implements OnInit {
  equipos: Equipo[];
  equiposFiltrados: Equipo[];
  jugadoresFiltrados: Jugador[];
  estadisticasJugadores: JugadorStats[];
  año: number;
  titulos: string[];

  top5: JugadorStats[];
  mejorJugador: JugadorStats;

  constructor(private estadisticasService: StatsService) {
    this.equipos = [];
    this.equiposFiltrados = [];
    this.jugadoresFiltrados = [];
    this.estadisticasJugadores = [];
    this.año = 2023;
    this.titulos = [
      'Puntos',
      'Rebotes',
      'Asistencias',
      'Porcentaje de tiros',
      '+/-',
      'robos',
    ];
    this.top5=[];
    this.mejorJugador=this.estadisticasJugadores[0];
  }

  ngOnInit() {
    this.getTodasEstadisticas();
  }

  getTodasEstadisticas() {
    this.estadisticasService
      .obtenerTodasLasEstadisticasJugadores(this.año)
      .subscribe((jugadores) => {
        this.estadisticasJugadores = jugadores;
      });
  }

  filtrarCincoMejoresCategoria<T extends keyof JugadorStats>(categoria: T) {
    this.estadisticasJugadores.sort((a, b) => {
      if (typeof a[categoria] === 'number') {
        return (b[categoria] as number) - (a[categoria] as number);
      } else if (typeof a[categoria] === 'string') {
        return (b[categoria] as string).localeCompare(a[categoria] as string);
      } else {
        return 0;
      }
    });
    return this.estadisticasJugadores.slice(0, 5);
  }

  // separaJugadores(){
  //   [this.mejorJugador, ...this.top5] = this.filtrarCincoMejoresCategoria();
  // }
}
