import { Equipo } from './../../interfaces/equipo.interface';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterService } from 'src/app/services/filter.service';
import { SearchService } from 'src/app/services/search.service';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';

@Component({
  standalone: true,
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbDropdownModule,
    SpinnerComponent,
  ],
})
export class EquiposComponent implements OnInit {
  isLoading = false;
  equipos: Equipo[];
  equiposFiltrados: Equipo[];
  conferencias: string[] = ['Eastern', 'Western', 'todas'];
  conferenciaSeleccionada = 'todas';

  constructor(
    private equipoService: SearchService,
    private _filterService: FilterService,
    private _router: Router
  ) {
    this.equipos = [];
    this.equiposFiltrados = [];
  }

  ngOnInit() {
    this.getEquipos();
  }

  getEquipos(): void {
    this.equipoService.obtenerEquiposActivos().subscribe((equipos) => {
      this.equipos = equipos;
      this.equiposFiltrados = equipos;
      setTimeout(() => {
        this.isLoading = true;
      }, 1500);
    });
  }

  filtrarPorConferencia() {
    this.equiposFiltrados = this._filterService.filtrarEquipoPorConferencia(
      this.conferenciaSeleccionada,
      this.equipos
    );
  }

  ordernarPorNombreDesc() {
    this._filterService.ordernarEquipoPorNombreDesc(this.equiposFiltrados);
  }
  ordernarPorNombreAsc() {
    this._filterService.ordernarEquipoPorNombreAsc(this.equiposFiltrados);
  }
  gotoRoute(equipo: Equipo) {
    const extras = { state: { id: equipo.TeamID } };
    this._router.navigateByUrl('/equipos/details', extras);
  }
}
