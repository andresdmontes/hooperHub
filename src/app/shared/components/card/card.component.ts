import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { JugadorStats } from 'src/app/interfaces/estadisticas.interface';
import { StatsService } from '../../../services/stats.service';
import { SearchService } from '../../../services/search.service';
import { Equipo } from 'src/app/interfaces/equipo.interface';
import { Jugador } from 'src/app/interfaces/jugador.interface';
import { type } from 'ngx-bootstrap-icons';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class CardComponent implements OnInit {
  año: number;
  estadisticasJugadores: JugadorStats[];
  mejorJugador: JugadorStats;
  top5: JugadorStats[];
  @Input() titulo: string;
  @Input() categoria: keyof JugadorStats;

  constructor(private statsService: StatsService) {
    this.año = 2023;
    this.estadisticasJugadores = [];
    this.mejorJugador = this.estadisticasJugadores[0];
    this.top5 = [];
    this.titulo = '';
    this.categoria = 'Points';
  }

  ngOnInit() {
    this.getTodasEstadisticas();
    console.log(this.estadisticasJugadores);
    // this.asignarDatos();
  }

  getTodasEstadisticas() {
    this.statsService
      .obtenerTodasLasEstadisticasJugadores(this.año)
      .subscribe((jugadores) => {
        this.estadisticasJugadores = jugadores;
        this.top5 = this.filtrarCincoMejoresCategoriaPorPartido(this.categoria);
        this.mejorJugador = this.filtrarMejorJugadorCategoriaPorPartido(this.categoria);
      });
  }

  asignarDatos() {
    console.log(this.filtrarCincoMejoresCategoria(this.categoria));
    this.top5 = this.filtrarCincoMejoresCategoria(this.categoria);
    // this.mejorJugador = this.filtrarMejorJugadorCategoria(this.categoria);
  }

  getStats(jugador: JugadorStats) {
    return (jugador[this.categoria] as number) / jugador.Games;
  }

  getType() {
    return typeof this.mejorJugador[this.categoria];
  }

  filtrarCincoMejoresCategoria<T extends keyof JugadorStats>(categoria: T) {
    console.log(this.estadisticasJugadores);
    this.estadisticasJugadores.sort((a, b) => {
      if (typeof a[categoria] === 'number') {
        return (b[categoria] as number) - (a[categoria] as number);
      } else if (typeof a[categoria] === 'string') {
        return (b[categoria] as string).localeCompare(a[categoria] as string);
      } else {
        return 0;
      }
    });
    return this.estadisticasJugadores.slice(1, 5);
  }

  filtrarCincoMejoresCategoriaPorPartido<T extends keyof JugadorStats>(
    categoria: T
  ) {
    this.estadisticasJugadores.sort((a, b) => {
      if (typeof a[categoria] === 'number') {
        return (
          (b[categoria] as number) / b.Games -
          (a[categoria] as number) / a.Games
        );
      } else if (typeof a[categoria] === 'string') {
        return (b[categoria] as string).localeCompare(a[categoria] as string);
      } else {
        return 0;
      }
    });
    return this.estadisticasJugadores.slice(1, 5);
  }

  filtrarMejorJugadorCategoria<T extends keyof JugadorStats>(categoria: T) {
    this.estadisticasJugadores.sort((a, b) => {
      if (typeof a[categoria] === 'number') {
        return (b[categoria] as number) - (a[categoria] as number);
      } else if (typeof a[categoria] === 'string') {
        return (b[categoria] as string).localeCompare(a[categoria] as string);
      } else {
        return 0;
      }
    });
    return this.estadisticasJugadores[0];
  }
  filtrarMejorJugadorCategoriaPorPartido<T extends keyof JugadorStats>(
    categoria: T
  ) {
    this.estadisticasJugadores.sort((a, b) => {
      if (typeof a[categoria] === 'number') {
        return (
          (b[categoria] as number) / b.Games -
          (a[categoria] as number) / a.Games
        );
      } else if (typeof a[categoria] === 'string') {
        return (b[categoria] as string).localeCompare(a[categoria] as string);
      } else {
        return 0;
      }
    });
    return this.estadisticasJugadores[0];
  }
}
