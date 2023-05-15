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
  estadisticasJugadores: JugadorStats[];
  mejorJugador: JugadorStats;
  top5: JugadorStats[];
  @Input() titulo: string;
  @Input() categoria: keyof JugadorStats;
  @Input() equipos: Equipo[];

  constructor(
    private _statsService: StatsService,
    private _filterService: FilterService
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
    this._statsService
      .obtenerTodasLasEstadisticasJugadores(this.año)
      .subscribe((jugadores) => {
        this.estadisticasJugadores = jugadores;

        this.top5 = this._filterService.filtrarCincoMejoresCategoriaPorPartido(
          this.categoria,
          this.estadisticasJugadores
        );
        this.mejorJugador =
          this._filterService.filtrarMejorJugadorCategoriaPorPartido(
            this.categoria,
            this.estadisticasJugadores
          );

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
    let equipoID = jugador.TeamID;
    return this.equipos.find((e) => e.TeamID === equipoID);
  }

  logoEquipo(jugador: JugadorStats): string {
    let equipo = this.getEquipoPorJugador(jugador);
    if (equipo) {
      return equipo.WikipediaLogoUrl;
    }
    return '';
  }
  siglasEquipo(jugador: JugadorStats): string {
    let equipo = this.getEquipoPorJugador(jugador);
    if (equipo) {
      return equipo.Key;
    }
    return '';
  }
}
