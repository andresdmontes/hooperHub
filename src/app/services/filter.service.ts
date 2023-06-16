import { Injectable } from '@angular/core';
import { JugadorStats } from '../interfaces/estadisticas.interface';
import { SearchService } from './search.service';
import { Equipo } from '../interfaces/equipo.interface';
import { StatsService } from './stats.service';
import { TeamStats } from '../interfaces/teamstats.interface';

@Injectable({ providedIn: 'root' })
export class FilterService {
  public equiposFiltrados: Equipo[] = [];
  public equiposEstadisticasFiltrados: TeamStats[] = [];
  public jugadoresFiltrados: JugadorStats[] = [];
  constructor(
    private _searchService: SearchService,
    private _statService: StatsService
  ) {}

  getEquipos(): void {
    this._searchService.equipos$.subscribe((equipos) => {
      this.equiposFiltrados = equipos;
    });
  }

  getJugadores(): void {
    this._statService.jugadores$.subscribe((jugadoresBuscados) => {
      this.jugadoresFiltrados = jugadoresBuscados;
    });
    this._statService.equipoStatsSubject$.subscribe((equipos) => {
      this.equiposEstadisticasFiltrados = equipos;
    });
  }
  filtrarMejoresCategoria<T extends keyof JugadorStats>(
    categoria: T,
    ascending: boolean
  ): JugadorStats[] {
    this.getJugadores();
    if (ascending) {
      this.jugadoresFiltrados.sort((a, b) => {
        if (typeof a[categoria] === 'number') {
          return (b[categoria] as number) - (a[categoria] as number);
        } else if (typeof a[categoria] === 'string') {
          return (b[categoria] as string).localeCompare(a[categoria] as string);
        } else {
          return 0;
        }
      });
    } else {
      this.jugadoresFiltrados.sort((a, b) => {
        if (typeof a[categoria] === 'number') {
          return (a[categoria] as number) - (b[categoria] as number);
        } else if (typeof a[categoria] === 'string') {
          return (a[categoria] as string).localeCompare(b[categoria] as string);
        } else {
          return 0;
        }
      });
    }
    return this.jugadoresFiltrados;
  }

  filtrarMejoresEquiposCategoria<T extends keyof TeamStats>(
    categoria: T,
    ascending: boolean
  ): TeamStats[] {
    this.getJugadores();
    if (ascending) {
      this.equiposEstadisticasFiltrados.sort((a, b) => {
        if (typeof a[categoria] === 'number') {
          return (b[categoria] as number) - (a[categoria] as number);
        } else if (typeof a[categoria] === 'string') {
          return (b[categoria] as string).localeCompare(a[categoria] as string);
        } else {
          return 0;
        }
      });
    } else {
      this.equiposEstadisticasFiltrados.sort((a, b) => {
        if (typeof a[categoria] === 'number') {
          return (a[categoria] as number) - (b[categoria] as number);
        } else if (typeof a[categoria] === 'string') {
          return (a[categoria] as string).localeCompare(b[categoria] as string);
        } else {
          return 0;
        }
      });
    }
    return this.equiposEstadisticasFiltrados;
  }

  filtrarEquipoPorConferencia(
    conferenciaSeleccionada: string,
    equipos: Equipo[]
  ): Equipo[] {
    if (conferenciaSeleccionada === 'All') {
      return equipos;
    } else {
      return equipos.filter(
        (equipo) => equipo.Conference === conferenciaSeleccionada
      );
    }
  }

  ordernarEquipoPorNombreDesc(equiposFiltrados: Equipo[]): Equipo[] {
    return equiposFiltrados.sort((a, b) => a.Name.localeCompare(b.Name));
  }
  ordernarEquipoPorNombreAsc(equiposFiltrados: Equipo[]): Equipo[] {
    return equiposFiltrados.sort((a, b) => b.Name.localeCompare(a.Name));
  }

  filtrarJugadoresPorConferencia(
    conferenciaSeleccionada: string
  ): JugadorStats[] {
    this.getJugadores();
    let filteredPlayers: JugadorStats[] = [];
    let equiposIds: number[] = [];
    if (conferenciaSeleccionada === 'All') {
      return this.jugadoresFiltrados;
    } else {
      this.getEquipos();

      this.equiposFiltrados = this.filtrarEquipoPorConferencia(
        conferenciaSeleccionada,
        this.equiposFiltrados
      );
      equiposIds = this.equiposFiltrados.map((equipo) => equipo.TeamID); // Obtener un array de IDs de equipos
      filteredPlayers = this.jugadoresFiltrados.filter((jugador) =>
        equiposIds.includes(jugador.TeamID)
      );
    }

    return filteredPlayers;
  }

  filtrarJugadoresPorPosiciones(posicion: string) {
    this.getJugadores();
    let filtrar: JugadorStats[] = [];
    filtrar = this.jugadoresFiltrados.filter((jugador) =>
      jugador.Position.includes(posicion)
    );
    return filtrar;
  }

}
