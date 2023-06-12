import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JugadorStats } from 'src/app/interfaces/estadisticas.interface';
import { StatsService } from '../../../services/stats.service';
import { RouterModule } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { Equipo } from 'src/app/interfaces/equipo.interface';
import { FilterService } from 'src/app/services/filter.service';

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
  equipos: Equipo[];
  estadisticasJugadores: JugadorStats[];
  mejorJugador: JugadorStats;
  top5: JugadorStats[];
  @Input() titulo: string;
  @Input() categoria: keyof JugadorStats;

  constructor(
    private _statsService: StatsService,
    private _filterService: FilterService,
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
    this._searchService.equipos$.subscribe((data) => {
      this.equipos = data;
    });
  }

  getTodasEstadisticas() {
    this._statsService
      .obtenerTodasLasEstadisticasJugadores(this.año)
      .subscribe((jugadores) => {
        this.estadisticasJugadores = jugadores;

        this.top5 = this._filterService
          .filtrarMejoresCategoria(this.categoria, true)
          .slice(1, 5);
        this.mejorJugador = this._filterService.filtrarMejoresCategoria(
          this.categoria,
          true
        )[0];

        this.isLoaded.emit(true);
        this.datosCargados = true;
      });
  }

  getStats(jugador: JugadorStats) {
    return (jugador[this.categoria] as number) / jugador.Games;
  }

  getType() {
    return typeof this.mejorJugador[this.categoria];
  }
  getEquipoPorJugador(jugador: JugadorStats): Equipo | undefined {
    const equipoID = jugador.TeamID;
    return this.equipos.find((e) => e.TeamID === equipoID);
  }

  logoEquipo(jugador: JugadorStats): string {
    const equipo = this.getEquipoPorJugador(jugador);
    if (equipo) {
      return equipo.WikipediaLogoUrl;
    }
    return '';
  }
  siglasEquipo(jugador: JugadorStats): string {
    const equipo = this.getEquipoPorJugador(jugador);
    if (equipo) {
      return equipo.Key;
    }
    return '';
  }
}
