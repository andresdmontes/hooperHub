import { Injectable } from '@angular/core';
import { JugadorStats } from '../interfaces/estadisticas.interface';
import { SearchService } from './search.service';
import { Equipo } from '../interfaces/equipo.interface';
import { Observable, map } from 'rxjs';
import { Jugador } from '../interfaces/jugador.interface';
import { get } from 'jquery';
import { TestBed } from '@angular/core/testing';

@Injectable({ providedIn: 'root' })
export class FilterService {
  public equiposFiltrados: Equipo[] = [];
  constructor(private _searchService: SearchService) {}

  getEquipos(): void {
    this._searchService.equipos$.subscribe((equipos) => {
      this.equiposFiltrados = equipos;
    });
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
    conferenciaSeleccionada: string,
    jugadores: Jugador[]
  ): Jugador[] {
    let filteredPlayers: Jugador[] = [];
    let equiposIds: number[] = [];
    if (conferenciaSeleccionada === 'todas') {
      return jugadores;
    } else {
      this.getEquipos();
      setTimeout(() => {
        this.equiposFiltrados = this.filtrarEquipoPorConferencia(
          conferenciaSeleccionada,
          this.equiposFiltrados
        );
        equiposIds = this.equiposFiltrados.map((equipo) => equipo.TeamID); // Obtener un array de IDs de equipos

        filteredPlayers = jugadores.filter((jugador) =>
          equiposIds.includes(jugador.TeamID)
        );
      }, 2);
    }

    return filteredPlayers;
  }

  ordernarJugadoresPorNombreDesc(equiposFiltrados: Equipo[]): Equipo[] {
    return equiposFiltrados.sort((a, b) => a.Name.localeCompare(b.Name));
  }
  ordernarJugadoresPorNombreAsc(equiposFiltrados: Equipo[]): Equipo[] {
    return equiposFiltrados.sort((a, b) => b.Name.localeCompare(a.Name));
  }
}
