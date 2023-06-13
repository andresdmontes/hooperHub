import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Equipo } from '../interfaces/equipo.interface';
import { JugadorStats } from '../interfaces/estadisticas.interface';
import { Jugador } from '../interfaces/jugador.interface';
import { TeamStats } from '../interfaces/teamstats.interface';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private baseApiUrl = 'https://api.sportsdata.io/v3/nba/stats/json/';

  private apiKey = '36ab1764fc1c4031bb926d88a05a585a';
  private jugadoresSubject: BehaviorSubject<JugadorStats[]> =
    new BehaviorSubject<JugadorStats[]>([]);

  jugadores$: Observable<JugadorStats[]> = this.jugadoresSubject.asObservable();

  private equipoStatsSubject: BehaviorSubject<TeamStats[]> =
    new BehaviorSubject<TeamStats[]>([]);

  equipoStatsSubject$: Observable<TeamStats[]> =
    this.equipoStatsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.obtenerTodasLasEstadisticasJugadores(2023).subscribe((jugadores) => {
      this.jugadoresSubject.next(jugadores);
    });
    this.obtenerTodasLasEstadisticasEquipos(2023).subscribe((equipos) => {
      this.equipoStatsSubject.next(equipos);
    });
  }

  obtenerTodasLasEstadisticasJugadores(
    año: number
  ): Observable<JugadorStats[]> {
    return this.http.get<JugadorStats[]>(
      this.baseApiUrl + 'PlayerSeasonStats/' + año + '?key=' + this.apiKey
    );
  }
  obtenerTodasLasEstadisticasEquipos(año: number): Observable<TeamStats[]> {
    return this.http.get<any[]>(
      'https://api.sportsdata.io/v3/nba/scores/json/TeamSeasonStats/' +
        año +
        '?key=' +
        this.apiKey
    );
  }
}
