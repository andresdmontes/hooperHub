import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Equipo } from 'src/app/interfaces/equipo.interface';
import { Jugador } from 'src/app/interfaces/jugador.interface';
import { SearchService } from 'src/app/services/search.service';
import { FormsModule } from '@angular/forms';
import { FiltrarComponent } from 'src/app/shared/components/filtrar/filtrar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { event } from 'jquery';
import { FilterService } from 'src/app/services/filter.service';

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
  @ViewChild(FiltrarComponent) filters!: FiltrarComponent;
  public p: number = 1;
  public jugadoresFiltrados: Jugador[];
  public loading = true;
  public conferencia: string;
  public posicion: string;
  public categoria: string;

  constructor(
    private SearchService: SearchService,
    private _filterService: FilterService
  ) {
    this.jugadoresFiltrados = [];
    this.conferencia = '';
    this.posicion = '';
    this.categoria = '';
  }

  ngOnInit() {
    this.getJugadores();
  }

  getJugadores(): void {
    this.SearchService.jugadores$.subscribe((jugadoresBuscados) => {
      this.jugadoresFiltrados = jugadoresBuscados;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
  }

  conferenciaSeleccionada() {
    this.conferencia = this.filters.form.form.value['conference'];
    this.jugadoresFiltrados =
      this._filterService.filtrarJugadoresPorConferencia(this.conferencia);
  }
  posicionSeleccionada() {
    this.posicion = this.filters.form.form.value['posicion'];
    this.jugadoresFiltrados = this._filterService.filtrarJugadoresPorPosiciones(this.posicion)
    console.log(this.posicion);
  }
  categoriaSeleccionada() {
    this.categoria = this.filters.form.form.value['categoria'];
    console.log(this.categoria);
  }
}
