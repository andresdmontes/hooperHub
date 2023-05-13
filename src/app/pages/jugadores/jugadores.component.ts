import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Equipo } from 'src/app/interfaces/equipo.interface';
import { Jugador } from 'src/app/interfaces/jugador.interface';
import { SearchService } from 'src/app/services/search.service';
import { FormsModule } from '@angular/forms';
import { FiltrarComponent } from 'src/app/shared/components/filtrar/filtrar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';

@Component({
  standalone: true,
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    FiltrarComponent,
    NgxPaginationModule,
    SpinnerComponent,
  ],
})
export class JugadoresComponent implements OnInit {
  p: number = 1;
  jugadoresFiltrados: Jugador[];
  equipos: Equipo[];
  codigoEquipoSeleccionado: string;
  nombreEquipoSeleccionado: string;
  equipoSeleccionado: Equipo[];
  colorEquipo: string;
  rootElement: HTMLElement;
  loading = true;

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
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      });
  }
}
