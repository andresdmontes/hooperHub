import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { JugadorStats } from '../interfaces/estadisticas.interface';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private baseApiUrl = 'https://api.sportsdata.io/v3/nba/stats/json/';

  private apiKey = '36ab1764fc1c4031bb926d88a05a585a';
  private jugadoresSubject: BehaviorSubject<JugadorStats[]> =
    new BehaviorSubject<JugadorStats[]>([]);

  jugadores$: Observable<JugadorStats[]> = this.jugadoresSubject.asObservable();

  constructor(private http: HttpClient) {
    this.obtenerTodasLasEstadisticasJugadores(2023).subscribe((jugadores) => {
      this.jugadoresSubject.next(jugadores);
    });
  }

  obtenerTodasLasEstadisticasJugadores(
    año: number
  ): Observable<JugadorStats[]> {
    return this.http.get<any[]>(
      this.baseApiUrl + 'PlayerSeasonStats/' + año + '?key=' + this.apiKey
    );
  }
}
