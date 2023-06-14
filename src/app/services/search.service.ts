import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Equipo } from '../interfaces/equipo.interface';
import { Jugador } from '../interfaces/jugador.interface';
import { Stadium } from '../interfaces/stadium.interface';

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
  private stadiums: BehaviorSubject<Stadium[]> = new BehaviorSubject<Stadium[]>(
    []
  );

  equipos$: Observable<Equipo[]> = this.equiposSubject.asObservable();
  jugadores$: Observable<Jugador[]> = this.jugadoresSubject.asObservable();
  estadios$: Observable<Stadium[]> = this.stadiums.asObservable();

  constructor(private http: HttpClient) {
    this.obtenerTodosLosEquipos().subscribe((equipos) => {
      this.equiposSubject.next(equipos);
    });

    this.obtenerTodosLosJugadoresActivos().subscribe((jugadores) => {
      this.jugadoresSubject.next(jugadores);
    });
    this.obtenerEstadios().subscribe((estadios) => {
      this.stadiums.next(estadios);
    });
  }

  obtenerTodosLosEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(
      this.baseApiUrl + 'teams?key=' + this.apiKey
    );
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

  obtenerAgentesLibres(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(
      this.baseApiUrl + 'FreeAgents?key=' + this.apiKey
    );
  }

  obtenerJugadoresPorEquipo(equipoKey: string): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(
      this.baseApiUrl + 'PlayersBasic/' + equipoKey + '?key=' + this.apiKey
    );
  }

  obtenerEstadios() {
    return this.http.get<Stadium[]>(
      'https://api.sportsdata.io/v3/nba/scores/json/Stadiums' +
        '?key=' +
        this.apiKey
    );
  }
  obtenerNoticias() {
    return this.http.get<any[]>(
      'https://api.sportsdata.io/v3/nba/scores/json/News' +
        '?key=' +
        this.apiKey
    );
  }
}
