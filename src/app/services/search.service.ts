import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipo } from '../interfaces/equipo.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private baseApiUrl =
    'https://api.sportsdata.io/v3/nba/scores/json/';

  private apiKey = '36ab1764fc1c4031bb926d88a05a585a';

  constructor(private http: HttpClient) {}

  obtenerTodosLosEquipos(): Observable<Equipo[]> {
    return this.http.get<any[]>(this.baseApiUrl + 'AllTeams?key=' + this.apiKey);
  }

  obtenerEquiposActivos(): Observable<Equipo[]> {
    return this.http.get<any[]>(this.baseApiUrl + 'teams?key=' + this.apiKey);
  }

  obtenerEquiposPorConferencia(conferencia: string): Observable<Equipo[]> {
    if (conferencia === 'todos') {
      return this.obtenerEquiposActivos();
    } else {
      return this.http.get<any[]>(`${this.baseApiUrl}&Conference=${conferencia}`);
    }
  }

  obtenerTodosLosJugadoresActivos(){
    return this.http.get<any[]>(this.baseApiUrl + 'Players?key=' + this.apiKey);
  }

  obtenerAgentesLibres(){
    return this.http.get<any[]>(this.baseApiUrl + 'FreeAgents?key=' + this.apiKey);
  }

  obtenerJugadoresPorEquipo(equipoKey: string){
    return this.http.get<any[]>(this.baseApiUrl + 'PlayersBasic/'+ equipoKey+'?key=' + this.apiKey);
  }

}
