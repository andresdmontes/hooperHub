import { Injectable } from '@angular/core';
import { JugadorStats } from '../interfaces/estadisticas.interface';
import { SearchService } from './search.service';
import { Equipo } from '../interfaces/equipo.interface';
import { Jugador } from '../interfaces/jugador.interface';
import { StatsService } from './stats.service';

@Injectable({ providedIn: 'root' })
export class FilterService {
  public equiposFiltrados: Equipo[] = [];
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

  filtrarCincoMejoresCategoria<T extends keyof JugadorStats>(
    categoria: T,
    estadisticasJugadores: JugadorStats[]
  ) {
    estadisticasJugadores.sort((a, b) => {
      if (typeof a[categoria] === 'number') {
        return (b[categoria] as number) - (a[categoria] as number);
      } else if (typeof a[categoria] === 'string') {
        return (b[categoria] as string).localeCompare(a[categoria] as string);
      } else {
        return 0;
      }
    });
    return estadisticasJugadores.slice(1, 5);
  }

  filtrarCincoMejoresCategoriaPorPartido<T extends keyof JugadorStats>(
    categoria: T,
    estadisticasJugadores: JugadorStats[]
  ) {
    estadisticasJugadores.sort((a, b) => {
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
    return estadisticasJugadores.slice(1, 5);
  }

  filtrarMejorJugadorCategoria<T extends keyof JugadorStats>(
    categoria: T,
    estadisticasJugadores: JugadorStats[]
  ) {
    estadisticasJugadores.sort((a, b) => {
      if (typeof a[categoria] === 'number') {
        return (b[categoria] as number) - (a[categoria] as number);
      } else if (typeof a[categoria] === 'string') {
        return (b[categoria] as string).localeCompare(a[categoria] as string);
      } else {
        return 0;
      }
    });
    return estadisticasJugadores[0];
  }
  filtrarMejorJugadorCategoriaPorPartido<T extends keyof JugadorStats>(
    categoria: T,
    estadisticasJugadores: JugadorStats[]
  ) {
    estadisticasJugadores.sort((a, b) => {
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
    return estadisticasJugadores[0];
  }

  filtrarEquipoPorConferencia(
    conferenciaSeleccionada: string,
    equipos: Equipo[]
  ): Equipo[] {
    if (conferenciaSeleccionada === 'todas') {
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
      console.log(equiposIds);
      filteredPlayers = this.jugadoresFiltrados.filter((jugador) =>
        equiposIds.includes(jugador.TeamID)
      );
    }

    return filteredPlayers;
  }

  filtrarJugadoresPorPosiciones(posicion: string) {
    this.getJugadores();
    let filtrar: JugadorStats[] = [];
    if (posicion === 'G') {
      filtrar = this.jugadoresFiltrados.filter(
        (jugador) => jugador.Position == 'PG' || jugador.Position === 'SG'
      );
      console.log(filtrar);
    } else if (posicion === 'F') {
      filtrar = this.jugadoresFiltrados.filter(
        (jugador) => jugador.Position == 'SF' || jugador.Position === 'PF'
      );
    } else {
      filtrar = this.jugadoresFiltrados.filter((jugador) =>
        jugador.Position.includes(posicion)
      );
    }
    return filtrar;
  }
}
