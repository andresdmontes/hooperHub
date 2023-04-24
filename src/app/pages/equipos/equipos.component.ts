import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Equipo } from 'src/app/interfaces/equipo.interface';
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

  constructor(private equipoService: SearchService) {
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

  filtrarPorConferencia(): void {
    if (this.conferenciaSeleccionada === 'todas') {
      this.equiposFiltrados = this.equipos;
    } else {
      this.equiposFiltrados = this.equipos.filter(
        (equipo) => equipo.Conference === this.conferenciaSeleccionada
      );
    }
  }

  ordernarPorNombreDesc(): void {
    this.equiposFiltrados.sort((a, b) => a.Name.localeCompare(b.Name));
    console.log(this.equiposFiltrados);
  }
  ordernarPorNombreAsc(): void {
    this.equiposFiltrados.sort((a, b) => b.Name.localeCompare(a.Name));
    console.log(this.equiposFiltrados);
  }
}
