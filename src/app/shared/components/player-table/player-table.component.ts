import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { JugadorStats } from 'src/app/interfaces/estadisticas.interface';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  standalone: true,
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css'],
  imports: [CommonModule, NgxPaginationModule],
})
export class PlayerTableComponent {
  @Input() jugadoresFiltrados!: JugadorStats[];
  public p: number = 1;

  constructor(private readonly _filter: FilterService) {}

  public toggle(categoria: keyof JugadorStats) {
    console.log(
      this._filter.filtrarMejoresCategoria(categoria, this.jugadoresFiltrados).slice(0,5)
    );
  }
}
