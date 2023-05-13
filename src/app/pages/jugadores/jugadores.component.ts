import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Equipo } from 'src/app/interfaces/equipo.interface';
import { Jugador } from 'src/app/interfaces/jugador.interface';
import { SearchService } from 'src/app/services/search.service';
import { FormsModule } from '@angular/forms';
import { FiltrarComponent } from 'src/app/shared/components/filtrar/filtrar.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  standalone: true,
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css'],
  imports: [CommonModule, FormsModule,FiltrarComponent, NgxPaginationModule],
})
export class JugadoresComponent implements OnInit {
  p:number = 1;
  jugadoresFiltrados: Jugador[];
  equipos: Equipo[];
  codigoEquipoSeleccionado: string;
  nombreEquipoSeleccionado: string;
  equipoSeleccionado: Equipo[];
  colorEquipo: string;
  rootElement: HTMLElement;

  constructor(private equipoService: SearchService) {
    this.jugadoresFiltrados = [];
    this.equipos = [];
    this.equipoSeleccionado = this.equipos;
    this.nombreEquipoSeleccionado = '';
    this.codigoEquipoSeleccionado = '';
    this.colorEquipo = '';
    this.rootElement = document.documentElement;
  }

  ngOnInit() {
    this.getJugadores();
  }

  getJugadores(): void {
    this.equipoService
    .obtenerTodosLosJugadoresActivos()
    .subscribe((jugadoresBuscados) => {
      this.jugadoresFiltrados = jugadoresBuscados;
    });

      // getEquipos(): void {
      //   this.equipoService.obtenerEquiposActivos().subscribe((equipos) => {
      //     this.equipos = equipos;
      //   });
      // }

      // filtrarPorEquipo(): void {
      //   this.equipoSeleccionado = this.equipos.filter(
      //     (equipo) => equipo.Name === this.nombreEquipoSeleccionado
      //   );
      //   if (this.equipoSeleccionado[0] === undefined) {
      //     this.codigoEquipoSeleccionado = this.equipos[0].Key;
      //   } else {
      //     this.codigoEquipoSeleccionado = this.equipoSeleccionado[0].Key;
      //     this.colorEquipo = '#' + this.equipoSeleccionado[0].PrimaryColor;
      //     this.rootElement.style.setProperty('--bgColor', this.colorEquipo);
      //   }
      //   this.getJugadores();
      // }
  }

  // getJugadores(): void {
  //   this.equipoService
  //     .obtenerJugadoresPorEquipo(this.codigoEquipoSeleccionado)
  //     .subscribe((jugadoresBuscados) => {
  //       this.jugadoresFiltrados = jugadoresBuscados;
  //     });
  // }
}
