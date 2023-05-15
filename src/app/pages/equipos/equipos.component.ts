import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Equipo } from 'src/app/interfaces/equipo.interface';
import { FilterService } from 'src/app/services/filter.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  standalone: true,
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, NgbDropdownModule],
})
export class EquiposComponent implements OnInit {
  equipos: Equipo[];
  equiposFiltrados: Equipo[];
  conferencias: string[] = ['Eastern', 'Western', 'todas'];
  conferenciaSeleccionada: string = 'todas';

  constructor(
    private equipoService: SearchService,
    private _filterService: FilterService
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
    });
  }

  filtrarPorConferencia() {
    this.equiposFiltrados = this._filterService.filtrarPorConferencia(
      this.conferenciaSeleccionada,
      this.equipos
    );
  }

  ordernarPorNombreDesc() {
    this._filterService.ordernarPorNombreDesc(this.equiposFiltrados);
  }
  ordernarPorNombreAsc() {
    this._filterService.ordernarPorNombreAsc(this.equiposFiltrados);
  }
}
