import { Component, Input, OnInit } from '@angular/core';
import { JugadorStats } from '../../../interfaces/estadisticas.interface';
import { StatsService } from 'src/app/services/stats.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css'],
  imports:[
    CommonModule
  ]
})
export class TarjetaComponent implements OnInit {
  @Input() categoria: keyof JugadorStats;

  public jugador: JugadorStats;
  public jugadoresFiltrados: JugadorStats[];
  public estadisticasJugadores: JugadorStats[];

  constructor(private _statsService: StatsService) {

    this.jugadoresFiltrados = [];
    this.estadisticasJugadores = [];
    this.jugador = this.estadisticasJugadores[0];
    this.categoria = 'Points';
  }
  ngOnInit(): void {
    this.loadPlayersStats();
    this.anuncio()
  }

  loadPlayersStats() {
    this._statsService
      .obtenerTodasLasEstadisticasJugadores(2023)
      .subscribe((jugadores) => {
        this.estadisticasJugadores = jugadores;
      });
  }

  anuncio() {
    this.jugadoresFiltrados = this.CincoMejoresCategoriaPorPartido(this.categoria);
    this.jugador = this.jugadoresFiltrados[0];
  }
  CincoMejoresCategoriaPorPartido<T extends keyof JugadorStats>(categoria: T) {
    this.loadPlayersStats();
    console.log(this.estadisticasJugadores)
    this.estadisticasJugadores.sort((a, b) => {
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
    return this.estadisticasJugadores.slice(1, 5);
  }
}
