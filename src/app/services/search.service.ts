import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Equipo } from '../interfaces/equipo.interface';
import { Jugador } from '../interfaces/jugador.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private baseApiUrl = 'https://api.sportsdata.io/v3/nba/scores/json/';
  private apiKey = '36ab1764fc1c4031bb926d88a05a585a';
  private equiposSubject: BehaviorSubject<Equipo[]> = new BehaviorSubject<
    Equipo[]
  >([]);
  private jugadoresSubject: BehaviorSubject<Jugador[]> = new BehaviorSubject<
    Jugador[]
  >([]);

  equipos$: Observable<Equipo[]> = this.equiposSubject.asObservable();
  jugadores$: Observable<Jugador[]> = this.jugadoresSubject.asObservable();

  constructor(private http: HttpClient) {
    this.obtenerTodosLosEquipos().subscribe((equipos) => {
      this.equiposSubject.next(equipos);
    });

    this.obtenerTodosLosJugadoresActivos().subscribe((jugadores) => {
      this.jugadoresSubject.next(jugadores);
    });
  }

  obtenerTodosLosEquipos(): Observable<Equipo[]> {
    return this.http.get<any[]>(this.baseApiUrl + 'teams?key=' + this.apiKey);
  }

  obtenerEquiposActivos(): Observable<Equipo[]> {
    return this.equipos$;
  }

  obtenenerJugadorPorID(id: number): Observable<Jugador> {
    return this.http.get<Jugador>(
      this.baseApiUrl + 'Player/' + id + '?key=' + this.apiKey
    );
  }

  obtenerTodosLosJugadoresActivos(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(
      this.baseApiUrl + 'Players?key=' + this.apiKey
    );
  }

  obtenerAgentesLibres(): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseApiUrl + 'FreeAgents?key=' + this.apiKey
    );
  }

  obtenerJugadoresPorEquipo(equipoKey: string): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseApiUrl + 'PlayersBasic/' + equipoKey + '?key=' + this.apiKey
    );
  }
}
