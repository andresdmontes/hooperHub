import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JugadorStats } from 'src/app/interfaces/estadisticas.interface';
import { StatsService } from '../../../services/stats.service';
import { RouterModule } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { Equipo } from 'src/app/interfaces/equipo.interface';

@Component({
  standalone: true,
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class CardComponent implements OnInit {
  @Output() isLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();
  datosCargados = false;
  año: number;
  estadisticasJugadores: JugadorStats[];
  mejorJugador: JugadorStats;
  top5: JugadorStats[];
  @Input() titulo: string;
  @Input() categoria: keyof JugadorStats;
  @Input() equipos: Equipo[];

  constructor(
    private _statsService: StatsService,
    private _searchService: SearchService
  ) {
    this.equipos = [];
    this.año = 2023;
    this.estadisticasJugadores = [];
    this.mejorJugador = this.estadisticasJugadores[0];
    this.top5 = [];
    this.titulo = '';
    this.categoria = 'Points';
  }

  ngOnInit() {
    this.getTodasEstadisticas();
  }

  getTodasEstadisticas() {
    console.log('cargados');
    this._statsService
      .obtenerTodasLasEstadisticasJugadores(this.año)
      .subscribe((jugadores) => {
        this.estadisticasJugadores = jugadores;
        if (this.estadisticasJugadores.length > 0) {
          this.top5 = this.filtrarCincoMejoresCategoriaPorPartido(
            this.categoria
          );
          this.mejorJugador = this.filtrarMejorJugadorCategoriaPorPartido(
            this.categoria
          );
          setTimeout(() => {
            this.isLoaded.emit(true);
            this.datosCargados = true;
          }, 1500);
        }
      });
  }

  asignarDatos() {
    this.top5 = this.filtrarCincoMejoresCategoria(this.categoria);
  }

  getStats(jugador: JugadorStats) {
    return (jugador[this.categoria] as number) / jugador.Games;
  }

  getType() {
    return typeof this.mejorJugador[this.categoria];
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
  logoEquipo(jugador: JugadorStats): string {
    let equipoID = jugador.TeamID;
    let equipo = this.equipos.find((e) => e.TeamID === equipoID);
    if (equipo) {
      return equipo.WikipediaLogoUrl;
    }
    return '';
  }
}
