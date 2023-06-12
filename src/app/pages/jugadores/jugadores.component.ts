import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { FormsModule } from '@angular/forms';
import { FiltrarComponent } from 'src/app/shared/components/filtrar/filtrar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { FilterService } from 'src/app/services/filter.service';
import { StatsService } from 'src/app/services/stats.service';
import { JugadorStats } from 'src/app/interfaces/estadisticas.interface';
import { PlayerTableComponent } from 'src/app/shared/components/player-table/player-table.component';

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
    PlayerTableComponent,
  ],
})
export class JugadoresComponent implements OnInit {
  @ViewChild(FiltrarComponent) filters!: FiltrarComponent;

  public jugadoresFiltrados: JugadorStats[];
  public loading = true;
  public conferencia: string;
  public posicion: string;
  public categoria: keyof JugadorStats;
  public isFilterOpen: boolean;

  constructor(
    private SearchService: SearchService,
    private _filterService: FilterService,
    private _playerStats: StatsService
  ) {
    this.jugadoresFiltrados = [];
    this.conferencia = '';
    this.posicion = '';
    this.categoria = 'Name';
    this.isFilterOpen = false;
  }

  ngOnInit() {
    this.getJugadores();
  }

  getJugadores(): void {
    this._playerStats.jugadores$.subscribe((jugadoresBuscados) => {
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
    this.jugadoresFiltrados = this._filterService.filtrarJugadoresPorPosiciones(
      this.posicion
    );
    console.log(this.posicion);
  }
  categoriaSeleccionada() {
    this.categoria = this.filters.form.form.value['categoria'];
    this.jugadoresFiltrados = this._filterService.filtrarMejoresCategoria(
      this.categoria,
      true
    );
  }

  toggleFilters() {
    this.isFilterOpen = !this.isFilterOpen;
  }
}
