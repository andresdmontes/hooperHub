import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Jugador } from 'src/app/interfaces/jugador.interface';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  standalone: true,
  selector: 'app-filtrar',
  templateUrl: './filtrar.component.html',
  styleUrls: ['./filtrar.component.css'],
  imports: [NgbDropdownModule],
})
export class FiltrarComponent {
  @Output() filteredTeams: EventEmitter<Jugador[]> = new EventEmitter<
    Jugador[]
  >();
  @Input() selectedTeams: Jugador[] = [];

  constructor(private _filterService: FilterService) {}

  filtrarConferencia(id: string) {
    this.filteredTeams.emit(
      this._filterService.filtrarJugadoresPorConferencia(id, this.selectedTeams)
    );
  }
}
