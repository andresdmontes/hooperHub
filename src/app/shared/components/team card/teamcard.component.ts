import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JugadorStats } from 'src/app/interfaces/estadisticas.interface';
import { StatsService } from '../../../services/stats.service';
import { RouterModule } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { Equipo } from 'src/app/interfaces/equipo.interface';
import { FilterService } from 'src/app/services/filter.service';
import { TeamStats } from 'src/app/interfaces/teamstats.interface';

@Component({
  standalone: true,
  selector: 'app-card-team',
  templateUrl: './teamcard.component.html',
  styleUrls: ['./teamcard.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class TeamCard implements OnInit {
  @Output() isLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();
  datosCargados = false;
  año: number;
  equipos: Equipo[];
  estadisticasEquipors: TeamStats[];
  mejorEquipo: TeamStats;
  top5: TeamStats[];
  @Input() titulo: string;
  @Input() categoria: keyof TeamStats;
  @Input() equipo: string;

  constructor(
    private _statsService: StatsService,
    private _filterService: FilterService,
    private _searchService: SearchService
  ) {
    this.equipos = [];
    this.año = 2023;
    this.estadisticasEquipors = [];
    this.mejorEquipo = this.estadisticasEquipors[0];
    this.top5 = [];
    this.titulo = '';
    this.categoria = 'Name';
    this.equipo = '';
  }

  ngOnInit() {
    this.getTodasEstadisticasEquipos();
    this._searchService.equipos$.subscribe((data) => {
      this.equipos = data;
    });
  }

  getTodasEstadisticasEquipos() {
    this._statsService
      .obtenerTodasLasEstadisticasEquipos(this.año)
      .subscribe((equipos) => {
        this.estadisticasEquipors = equipos;

        this.top5 = this._filterService
          .filtrarMejoresEquiposCategoria(this.categoria, true)
          .slice(1, 5);
        this.mejorEquipo = this._filterService.filtrarMejoresEquiposCategoria(
          this.categoria,
          true
        )[0];

        this.isLoaded.emit(true);
        this.datosCargados = true;
      });
  }

  getStats(equipo: TeamStats) {
    return (equipo[this.categoria] as number) / equipo.Games;
  }

  getType() {
    return typeof this.mejorEquipo[this.categoria];
  }

  getEquipoPorTeam(team: TeamStats): Equipo | undefined {
    let equipoID = team.TeamID;
    return this.equipos.find((e) => e.TeamID === equipoID);
  }

  getlogoEquipo(team: TeamStats): string {
    let equipo = this.getEquipoPorTeam(team);
    if (equipo) {
      return equipo.WikipediaLogoUrl;
    }
    return '';
  }
}
