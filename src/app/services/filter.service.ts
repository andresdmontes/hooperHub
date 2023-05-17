import { Injectable } from '@angular/core';
import { JugadorStats } from '../interfaces/estadisticas.interface';
import { SearchService } from './search.service';
import { Equipo } from '../interfaces/equipo.interface';
import { Observable, map } from 'rxjs';
import { Jugador } from '../interfaces/jugador.interface';
import { get } from 'jquery';

@Injectable({ providedIn: 'root' })
export class FilterService {
  constructor(private _searchService: SearchService) {}

  getTeamByPlayerID(jugador: Jugador): Observable<Equipo | undefined> {
    return this._searchService
      .obtenerTodosLosEquipos()
      .pipe(
        map((equipos: Equipo[]) =>
          equipos.find((equipo) => equipo.TeamID === jugador.TeamID)
        )
      );
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
    if (conferenciaSeleccionada === 'todas') {
      return jugadores;
    } else {
      jugadores.forEach((j) => {

        // this.getTeamByPlayerID(j).subscribe((equipo: Equipo | undefined) => {
        //   if (equipo && equipo.Conference === conferenciaSeleccionada) {
        //     filteredPlayers.push(j);
        //   }
        // });
      });
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
