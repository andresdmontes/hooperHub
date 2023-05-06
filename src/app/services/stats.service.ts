import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipo } from '../interfaces/equipo.interface';
import { JugadorStats } from '../interfaces/estadisticas.interface';
import { Jugador } from '../interfaces/jugador.interface';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private baseApiUrl = 'https://api.sportsdata.io/v3/nba/stats/json/';

  private apiKey = '36ab1764fc1c4031bb926d88a05a585a';

  constructor(private http: HttpClient) {}

  obtenerTodasLasEstadisticasJugadores(
    año: number
  ): Observable<JugadorStats[]> {
    return this.http.get<any[]>(
      this.baseApiUrl + 'PlayerSeasonStats/' + año + '?key=' + this.apiKey
    );
  }
}
